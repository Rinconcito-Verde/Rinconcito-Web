import { X, ShoppingBasket } from "lucide-static";
import { Icon } from "./Icon";
import NavLogics from "@/islands/NavLogics";
import { getAllCategories } from "@/context/CategoriesContext";

export function Header() {
  return (
    <header
      id="main-header"
      className="flex flex-col px-8 py-4 sticky top-0 z-[100] transition-all duration-300 rounded-xl"
    >
      <div class="flex justify-between items-center w-full">
        <a className="flex items-center gap-[1px]" href="/">
          <img
            className="w-[60px] h-[60px] object-contain"
            src="/img/logo.webp"
            alt="Logo Rinconcito Verde"
          />
  
          <p className="flex flex-col text-[1rem] font-semibold text-green-800 m-0 leading-none">
            Rinconcito
            <span className="text-green-600 font-bold leading-none m-0">
              Verde
            </span>
          </p>
        </a>
        <div className="hidden md:flex">
          <NavLinks />
        </div>
        <div className="flex">
          <NavLogics/>
          <a
            href="/carrito"
            className="flex items-center p-2 rounded-full transition-colors duration-200 text-green-700 text-[1.5rem] hover:bg-green-50"
            aria-label="Ver carrito"
          >
            <Icon icon={ShoppingBasket} className="inline-block align-middle" />
          </a>
        </div>
      </div>

      <div id="MobileNav" class="absolute top-full left-0 w-full h-[80dvh] flex-col transition-all duration-300 rounded-xl shadow-lg backdrop-blur-lg border-gray-200 bg-[#a7b67fd3] hidden">
        <button class="mobile-nav-toggle-menu md:hidden ml-auto m-4 mb-0">
           <Icon icon={X} className="hover:text-green-700" />
        </button>
        <NavLinks />
      </div>
    </header>
  );
}

async function NavLinks() {
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