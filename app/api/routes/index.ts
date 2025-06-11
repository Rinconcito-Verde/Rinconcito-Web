import { Hono } from "hono"
import { authRoutes } from "./auth"
import { updatePricesRouter } from "./updatePrices"
import { productsRouter } from "./products"
import { categoriesRouter } from "./categories"
import { checkoutHRouter } from "./checkout"

export const router = new Hono()

router.route('/auth', authRoutes)
router.route('/update', updatePricesRouter)
router.route('/products', productsRouter)
router.route('/categories', categoriesRouter)
router.route('/checkout', checkoutHRouter) 