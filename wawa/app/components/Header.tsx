import { X, ShoppingBasket } from "lucide-static";
import { Icon } from "./Icon";
import MobileNavLogic from "@/islands/mobilenav";
import { NavLinks } from "./NavLinks";

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

export function Header() {
    return (
        <header
            id="main-header"
            className="flex items-center justify-between px-8 py-4 sticky top-0 z-[100] transition-all duration-300 rounded-xl"
        >
            <a className="flex items-center gap-[1px]" href="/">
                <img
                    className="w-[60px] h-[60px] object-contain"
                    src="/img/logo.webp"
                    alt="Logo Rinconcito Verde"
                />
                <p className="flex flex-col text-[1rem] font-semibold text-green-800 m-0 leading-none">
                    Rinconcito
                    <span className="text-green-600 font-bold leading-none m-0">Verde</span>
                </p>
            </a>
            <div className="hidden md:flex">
                <NavLinks />
            </div>
            <div className="flex">
                <MobileNavLogic/>
                <a
                    href="/carrito"
                    className="flex items-center p-2 rounded-full transition-colors duration-200 text-green-700 text-[1.5rem] hover:bg-green-50"
                    aria-label="Ver carrito"
                >
                    <Icon icon={ShoppingBasket} className="inline-block align-middle" />
                </a>
            </div>
        </header>
    );
}