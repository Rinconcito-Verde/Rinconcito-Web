
import { getAllCategories as getCategories } from '@/services/categories';
import { getC } from './GlobalC';
let data: any
export async function getAllCategories() {
    const c = getC();
    // @ts-ignore
    const db = c.env.DB;
    if (!data) {
        const result = await getCategories(db);
        data = result;
    }

    return data
} 