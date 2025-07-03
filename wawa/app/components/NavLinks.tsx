import { getAllCategories } from "@/context/CategoriesContext";

export async function NavLinks() {
    const categories = await getAllCategories();
    return (
        <nav className="flex flex-col md:flex-row gap-8 m-5">
            <a
                href="/"
                className="no-underline text-gray-800 font-bold text-[1rem] transition-colors duration-200 hover:text-green-700"
            >Home</a>
            {categories && categories.map((category: any) => (
                <a
                    key={category.id}
                    href={`/${category.slug}`}
                    className="no-underline text-gray-800 font-bold text-[1rem] transition-colors duration-200 hover:text-green-700"
                >{category.name}</a>
            ))}
        </nav>
    );
}