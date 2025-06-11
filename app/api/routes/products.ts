import { Hono } from "hono"
import { getProductsHandler, getProductByIdHandler, createProductHandler, updateProductHandler, deleteProductHandler, getProductsByIdHandler } from "../handlers/products"
import { authMiddleware } from "../middlewares/auth"

import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

export const productSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().nullable(),
    short_description: z.string().max(70, "Short description must be at most 70 characters").nullable(),
    price: z.number().min(0),
    discount: z.number().min(0),
    currency: z.string().min(1, "Currency is required"),
    sort_order: z.number().int().min(0),
    image: z.string().url().nullable(),
    type: z.string(),
    expiration_date: z.string().nullable(),
    category_id: z.number().int().positive()
}); 
export const productSchemaCreate = productSchema.omit({ id: true });

export const productsRouter = new Hono()

productsRouter.get("/", getProductsHandler)
productsRouter.get("/:id", getProductByIdHandler)
productsRouter.post("/", authMiddleware, zValidator('json', productSchemaCreate), createProductHandler);
productsRouter.post("/batch", getProductsByIdHandler); 
productsRouter.put("/:id", zValidator('json', productSchema), authMiddleware, updateProductHandler);
productsRouter.delete("/:id", authMiddleware, deleteProductHandler);   