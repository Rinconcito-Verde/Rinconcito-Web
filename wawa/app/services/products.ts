import { product } from "@/types/types";
export async function getAllProducts(db: D1Database, categoryId?: string, categorySlug?: string) {
  let query = `SELECT product.*, category.id as category_id, category.name as category_name, category.slug as category_slug, category.sort_order as category_sort_order
               FROM product
               JOIN category ON product.category_id = category.id`;
  const params: any[] = [];
  if (categoryId) {
    query += " WHERE product.category_id = ?";
    params.push(categoryId);
  }
  else if (categorySlug) {
    query += " WHERE product.category_id = (SELECT id FROM category WHERE slug = ?)";
    params.push(categorySlug);
  }
  query += " ORDER BY product.sort_order ASC";
  const { results } = await db.prepare(query).bind(...params).all();
  return results.length > 0 ? results : null;
}

export async function getOneProductById(db: D1Database, id: string) {
  const { results } = await db
    .prepare('SELECT * FROM product WHERE id = ?')
    .bind(id)
    .all();

  return results.length > 0 ? results[0] : null;
}
export async function getProductsByIds(db: D1Database, ids: Array<string | number>) {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('getProductsByIds: ids must be a non-empty array');
  }
  const placeholders = ids.map(() => '?').join(',');
  const query = `SELECT * FROM product WHERE id IN (${placeholders})`;
  const { results } = await db.prepare(query).bind(...ids).all();
  return results.length > 0 ? results : null;
}

export async function getOneProductBySlug(db: D1Database, slug: string) {
  const { results }: { results: product[] } = await db
    .prepare('SELECT * FROM product WHERE slug = ?')
    .bind(slug)
    .all();

  return results.length > 0 ? results[0] : null;
}

export async function createProduct(db: D1Database, data: product) {
  let newId: number;
  let attempts = 0;

  while (true) {
    if (attempts >= 40) {
      throw new Error("Failed to generate a unique 4-digit product ID after multiple attempts.");
    }
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;


    const existingProduct = await db
      .prepare('SELECT id FROM product WHERE id = ?')
      .bind(randomNumber)
      .first();

    if (!existingProduct) {
      newId = randomNumber;
      break;
    }
    attempts++;
  }
  data.id = newId;
  const currentTime = new Date().toISOString();
  await db.prepare(
    `INSERT INTO product (id, name, slug, description, short_description, price, discount, sales_tax, currency, sort_order, image, type, expiration_date, created_at, updated_at, category_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    newId, data.name, data.slug, data.description, data.short_description,
    data.price, data.discount, data.sales_tax,
    data.currency, data.sort_order, data.image, data.type,
    data.expiration_date, currentTime, currentTime, data.category_id
  ).run();

  return { ...data , id: newId, created_at: currentTime, updated_at: currentTime };
}

export async function updateProduct(
  db: D1Database,
  id: string,
  data: product
): Promise<boolean> {
  try {
    const currentTime = new Date().toISOString();
    const query = `
      UPDATE product
      SET 
        name = ?, 
        slug = ?, 
        description = ?, 
        short_description = ?, 
        price = ?, 
        discount = ?, 
        sales_tax = ?, 
        currency = ?, 
        sort_order = ?, 
        image = ?, 
        type = ?, 
        expiration_date = ?, 
        updated_at = ?, 
        category_id = ?
      WHERE id = ?`;

    const params = [
      data.name,
      data.slug,
      data.description,
      data.short_description,
      data.price,
      data.discount,
      data.sales_tax,
      data.currency,
      data.sort_order,
      data.image,
      data.type,
      data.expiration_date,
      currentTime,
      data.category_id,
      id
    ];

    const result = await db.prepare(query).bind(...params).run();

    return result.meta.changes > 0;
  } catch (error) {
    return false;
  }
}


export async function deleteProduct(db: D1Database, id: string) {
  try {
    const result = await db.prepare(
      `DELETE FROM product WHERE id = ?`
    ).bind(id).run();

    if (result.meta.changes === 0) {
      throw new Error(`product with ID ${id} not found.`);
    }

    return { success: true, message: `product with ID ${id} deleted successfully.` };
  } catch (error: any) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
}
