import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import PopupPromo from "./PopupPromo";

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <PopupPromo />
    </div>
  );
}
