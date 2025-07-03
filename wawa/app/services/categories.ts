export async function getAllCategories(db: D1Database, includeproducts?: string) {
  const query = `
  SELECT 
    c.*, 
    (SELECT COUNT(*) FROM product p WHERE p.category_id = c.id) as product_count
  FROM category c
  ORDER BY c.sort_order ASC
`;
const { results } = await db.prepare(query).all();
return results; 
}

export async function getOneCategory(db: D1Database, idOrSlug?: string) {
  const { results } = await db
    .prepare(`
      SELECT 
        c.*, 
        (SELECT COUNT(*) FROM product p WHERE p.category_id = c.id) as product_count
      FROM category c
      WHERE (c.id = ? OR c.slug = ?)
    `)
    .bind(idOrSlug, idOrSlug)
    .all();

  if (results.length > 0) {
    return results
  }
  return null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number | null;
}
export async function createCategory(db: D1Database, data: Category): Promise<Category> {

  const result = await db
    .prepare(
      `INSERT INTO category (name, slug, description, sort_order)
       VALUES (?, ?, ?, ?)`
    )
    .bind(
      data.name,
      data.slug,
      data.description, 
      data.sort_order
    )
    .run();

  if (result.meta.last_row_id) {
    return {
      id: result.meta.last_row_id,
      name: data.name,
      slug: data.slug,
      description: data.description, 
      sort_order: data.sort_order
    };
  } else {
    console.error("Category creation seemed to succeed but last_row_id is missing.", result);
    throw new Error("Failed to create category or retrieve its ID.");
  }
}

export async function updateCategory(
  db: D1Database,
  id: string,
  data: Category
): Promise<boolean> {
  try {
    const result = await db
      .prepare(
        `UPDATE category
         SET name = ?, slug = ?, description = ?, sort_order = ?
         WHERE id = ?`
      )
      .bind(data.name, data.slug, data.description, data.sort_order, id)
      .run();

    return result.success;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category.');
  }
}

export async function deleteCategory(db: D1Database, id: string) {
  try {
    const result = await db.prepare(
      `DELETE FROM category WHERE id = ?`
    ).bind(id).run();
    if (result.meta.changes === 0) {
      throw new Error(`Category with ID ${id} not found.`);
    }
    return { success: true, message: `Category with ID ${id} deleted successfully.` };
  } catch (error: any) {
    throw new Error(`Error deleting Category: ${error.message}`);
  }
}