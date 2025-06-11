export async function updateproducts(db: D1Database) {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();

  const categoryMap = new Map<string, number>();
  let categoryId = 1;
  for (const product of data) {
    if (!categoryMap.has(product.category)) {
      categoryMap.set(product.category, categoryId++);
    }
  }

  for (const [name, id] of categoryMap.entries()) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    await db.prepare(`
      INSERT INTO category (id, name, description, slug, sort_order)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET 
        name = excluded.name,
        description = excluded.description,
        sort_order = excluded.sort_order
    `).bind(
      id,
      name,
      `Categoría falsa: ${name}`,
      slug,
      id
    ).run();
  }

  for (const product of data) {
    const id = Number(product.id);
    const name = product.title;
    const slug = name.toLowerCase().replace(/\s+/g, '-'); // Generar slug para producto
    const description = product.description;
    // --- Short description y discount aleatorios ---
    let short_description: string | null = null;
    let discount: number = 0;
    if (Math.random() < 0.5) {
      short_description = description.slice(0, 40) + '...';
      discount = Math.floor(Math.random() * 30); // 0-29% descuento
    }
    // ---------------------------------------------
    const price = Math.round(Number(product.price) * 100); // convertir a centavos
    const sales_tax = 0;
    const currency = 'USD';
    const sort_order = Number(id);
    const image = product.image;
    const type = 'permanent';
    const now = new Date().toISOString();
    const category_id = Number(categoryMap.get(product.category)) || 1;

    await db.prepare(`
      INSERT INTO product (
        id, name, slug, description, short_description, price, discount, sales_tax, currency, sort_order, image, type,
        expiration_date, created_at, updated_at, category_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET 
        name = excluded.name,
        slug = excluded.slug,
        description = excluded.description,
        short_description = excluded.short_description,
        price = excluded.price,
        discount = excluded.discount,
        sales_tax = excluded.sales_tax,
        currency = excluded.currency,
        sort_order = excluded.sort_order,
        image = excluded.image,
        type = excluded.type,
        expiration_date = excluded.expiration_date,
        created_at = excluded.created_at,
        updated_at = excluded.updated_at,
        category_id = excluded.category_id
    `).bind(
      id,
      name,
      slug,
      description,
      short_description,
      price,
      discount,
      sales_tax,
      currency,
      sort_order,
      image,
      type,
      null,
      now,
      now,
      category_id
    ).run();
  }

  return { updated: data.length };
}
