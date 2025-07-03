import { Hono } from "hono"
import { createCategoryHandler, deleteCategoryHandler, getCategories, getCategoryByIdOrSlug, updateCategoryHandler } from "../handlers/categories"
import { authMiddleware } from "../middlewares/auth"

export const categoriesRouter = new Hono()

categoriesRouter.get("/", getCategories)
categoriesRouter.get("/:idOrSlug", getCategoryByIdOrSlug)
categoriesRouter.post("/", authMiddleware, createCategoryHandler)
categoriesRouter.put("/:id", authMiddleware, updateCategoryHandler)
categoriesRouter.delete("/:id", authMiddleware, deleteCategoryHandler)