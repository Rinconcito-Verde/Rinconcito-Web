import { Context } from "hono";
import { getAllProducts, getOneProductById, updateProduct, createProduct, deleteProduct, getProductsByIds } from "@/services/products";

export async function getProductsHandler(c: Context) {
  const db = c.env.DB;
  const categoryId = c.req.query("categoryId");
  const categorySlug = c.req.query("categorySlug");
  const products = await getAllProducts(db, categoryId, categorySlug);
  if (!products) return c.json({ error: "Category not found or there are no products" }, 404);
  return c.json(products);
}

export async function getProductByIdHandler(c: Context) {
  const db = c.env.DB;
  const id = c.req.param("id");

  const productData = await getOneProductById(db, id);
  if (!productData) return c.json({ error: "products not found" }, 404);

  return c.json(productData);
}

export async function getProductsByIdHandler(c: Context) {
  const db = c.env.DB;
  const data = await c.req.json();
  const products = await getProductsByIds(db, data);
  if (!products) {
    return c.json({ error: "Products not found" }, 404);
  }
  return c.json(products);
}

export async function createProductHandler(c: Context) {
  try {
    const db = c.env.DB;
    const data = await c.req.json();
    const newproduct = await createProduct(db, data);

    return c.json({ success: true, product: newproduct }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
}

export async function updateProductHandler(c: Context) {
  const db = c.env.DB;
  const id = c.req.param("id");

  const data = await c.req.json();

  const productUpdated = await updateProduct(db, id, data);
  if (!productUpdated) {
    return c.json({ error: "Product not found or no changes were made" }, 404);
  }

  return c.json({ message: "Product updated successfully" });
}

export const deleteProductHandler = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const db = c.env.DB;
    if (!id) {
      return c.json({ success: false, message: 'product ID is required.' }, 400);
    }

    const result = await deleteProduct(db, id);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 404);
  }
};