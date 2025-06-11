import { css } from "hono/css";
import { Header } from "./Header";
import Footer from "./Footer";

export function Layout({ children }: { children: any }) {
    return (
            <div class={css`
                    display: grid;
                    min-height: 100dvh;
                    padding: 10px;
                    grid-template-rows: auto 1fr auto;
                    max-width: 1200px;
                    width: 100%;
                    background-color: rgba(255, 255, 255, 0.192);
                    backdrop-filter: blur(2px);
                    border-radius: 12px; 
                `}>
              <Header />
                <main class="h-full w-full min-h-[80dvh]">
                    {children}
                </main>
                <Footer />
            </div>
    )
}
