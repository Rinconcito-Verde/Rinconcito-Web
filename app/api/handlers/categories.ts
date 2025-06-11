import { Context } from "hono";
import { createCategory, deleteCategory, getAllCategories, getOneCategory, updateCategory } from "@/services/categories";

export async function getCategories(c: Context) {
  const db = c.env.DB;
  const includeproducts = c.req.query("includeproducts");
  const products = await getAllCategories(db, includeproducts);
  return c.json(products);
}

export async function getCategoryByIdOrSlug(c: Context) {
  const db = c.env.DB;
  const idOrSlug = c.req.param("idOrSlug");
  const categoryData = await getOneCategory(db, idOrSlug);
  if (!categoryData) {
    return c.json({ error: "Category not found" }, 404);
  }
  return c.json(categoryData);
}

export async function createCategoryHandler(c: Context) {
  try {
    const db = c.env.DB;
    const data = await c.req.json();
    const newCategory = await createCategory(db, data);
    return c.json({ success: true, category: newCategory }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 409);
  }
}
export async function updateCategoryHandler(c: Context){
try {
    const db = c.env.DB;
    const data = await c.req.json();
    const id = c.req.param("id");
    const update = await updateCategory(db, id, data);
    return c.json({ success: true, category: update }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 409);
  }
}
export async function deleteCategoryHandler(c: Context){
try {
    const id = c.req.param('id');
    const db = c.env.DB;
    if (!id) {
      return c.json({ success: false, message: 'product ID is required.' }, 400);
    }
    const result = await deleteCategory(db, id);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 404);
  }
};