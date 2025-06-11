import { getAllProducts, getOneProductBySlug } from '@/services/products';
import { getC } from './GlobalC';

const cache: {
  products?: any;
  productsCategoryBySlug?:  any;
  productBySlug?: any; 
} = {};
 
export async function getProducts() {
  const c = getC();
  const db = c.env.DB;
  if (!cache.products) {
    cache.products = await getAllProducts(db);
  }
  return cache.products;
} 

export async function getProductsCategoryBySlug(slug: string) {
  const c = getC();
  const db = c.env.DB;
  if (!cache.productsCategoryBySlug) {
    cache.productsCategoryBySlug = {};
  } 
  if (!cache.productsCategoryBySlug[slug]) {
    cache.productsCategoryBySlug[slug] = await getAllProducts(db, undefined, slug);
  }
  return cache.productsCategoryBySlug[slug];
}
 
export async function getProductBySlug(slug: string) {
  const c = getC();
  const db = c.env.DB;
  if (!cache.productBySlug) {
    cache.productBySlug = {};
  }
  if (!cache.productBySlug[slug]) {
    const result = await getOneProductBySlug(db, slug);
    cache.productBySlug[slug] = Array.isArray(result) ? result[0] : result;
  }
  return cache.productBySlug[slug];
} 