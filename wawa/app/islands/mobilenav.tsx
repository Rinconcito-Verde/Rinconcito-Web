import { useEffect, useState } from "hono/jsx";
import { Menu, X} from "lucide-static";
import { Icon } from "@/components/Icon";

// Corrige la declaración de categoriesCache y la lógica de caché
let categoriesCache: any = null;

function NavLinks() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (categoriesCache) {
            setCategories(categoriesCache);
            return;
        }
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                categoriesCache = data;
                setCategories(data as any);
            });
    }, []);
    return (
        <nav className="flex flex-col md:flex-row gap-8 m-5">
            <a
                href="/"
                className="no-underline text-gray-800 font-bold text-[1rem] transition-colors duration-200 hover:text-green-700"
            >Home</a>
            {categories.map((category: any) => (
                <a
                    key={category.id}
                    href={`/${category.slug}`}
                    className="no-underline text-gray-800 font-bold text-[1rem] transition-colors duration-200 hover:text-green-700"
                >{category.name}</a>
            ))}
        </nav>
    );
}

export function MobileNav({ children, onClose }: { children: any; onClose: () => void }) {
    return (
        <div className="min-h-[80dvh] flex flex-col" onClick={onClose}>
            <button className="mobile-nav-toggle-menu md:hidden ml-auto m-4 mb-0" onClick={onClose}>
                <Icon icon={X} className="hover:text-green-700" />
            </button>
            {children}
        </div>
    );
}
export default function MobileNavLogic() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById("main-header");
            if (!header) return;
            if (window.scrollY > 50) {
                header.classList.add(
                    "shadow-lg",
                    "backdrop-blur-lg",
                    "border-gray-200",
                    "bg-[#a7b67f9c]"
                );
            } else {
                header.classList.remove(
                    "shadow-lg",
                    "backdrop-blur-lg",
                    "border-gray-200",
                    "bg-[#a7b67f9c]"
                );
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <div className="md:hidden flex items-center"> 
      <button
        className="movile-nav-menu-toggle p-2 rounded-full text-green-700 hover:bg-green-50"
        aria-label="Abrir menú"
        id="menu-toggle"
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <Icon icon={Menu} className="inline-block align-middle" />
      </button>
      {mobileNavOpen && (
        <div
          id="mobile-nav-toggle-menu"
          className="movile-nav-menu-toggle absolute left-0 right-0 top-full w-full shadow-lg rounded-b-xl backdrop-blur-lg border-gray-200 bg-[#a7b67fd0]"
        >
          <MobileNav onClose={() => setMobileNavOpen(!mobileNavOpen)}>
            <NavLinks />
          </MobileNav>
        </div>
      )}
    </div>
  );
}
