import { useEffect } from "hono/jsx";
import { Menu } from "lucide-static";
import { Icon } from "@/components/Icon";

export default function NavLogic() {
  const handleOpenMenu = () => {
    const mobileNav = document.getElementById("MobileNav");
    if (!mobileNav) return;
    if (mobileNav?.classList.contains('hidden')) {
      mobileNav.classList.add(
        "flex"
      );
      mobileNav.classList.remove(
        "hidden"
      );
    } else {
      mobileNav.classList.remove(
        "flex"
      );
      mobileNav.classList.add(
        "hidden"
      );
    }
  };

  useEffect(() => {
    const mobileNav = document.getElementById("MobileNav");
    mobileNav?.addEventListener("click", handleOpenMenu);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("main-header");
      if (!header) return;
      if (window.scrollY > 50) {
        header.classList.add(
          "shadow-lg",
          "backdrop-blur-lg",
          "border-gray-200",
          "bg-[#a7b67f9c]",
        );
      } else {
        header.classList.remove(
          "shadow-lg",
          "backdrop-blur-lg",
          "border-gray-200",
          "bg-[#a7b67f9c]",
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
      <button
        className="movile-nav-menu-toggle p-2 rounded-full text-green-700 hover:bg-green-50 md:hidden "
        aria-label="Abrir menú"
        onClick={() => handleOpenMenu()}
      >
        <Icon icon={Menu} className="inline-block align-middle" />
      </button>
  );
}
