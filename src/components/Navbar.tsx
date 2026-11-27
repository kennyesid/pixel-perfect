import { Link } from "@tanstack/react-router";
import { Menu, Moon, ShoppingBag, ShoppingCart, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import GenericButton from "./ui/button/GenericButton";

function CartLink() {
  const { count } = useCart();
  return (
    <Link to="/carrito" aria-label="Ver carrito" className="relative grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-foreground transition hover:scale-105 ">
      <ShoppingCart className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-cappiblue px-1 text-xs font-bold text-primary-foreground">{count}</span>
      )}
    </Link>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:scale-105 hover:border-primary"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${isScrolled
      ? "bg-cappibluedark border-transparent shadow-md backdrop-blur-md"
      : "bg-cappibluedark border-transparent backdrop-blur-sm"
      }`}>
      <nav className="grid h-16 w-full grid-cols-12 items-center px-3 sm:px-6">
        {/* Sección 1: Logo */}
        <div className="col-span-6 flex items-center justify-start justify-self-start md:col-span-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
            <img
              src="/images/login/cappi-waffle-along_v2.webp"
              alt="CapyWaffles Logo"
              className="h-10 w-10 object-contain sm:h-12 sm:w-12 lg:h-18 lg:w-18"
            />
          </Link>
        </div>

        {/* Sección 2: Botones centrales (solo escritorio desde md) */}
        <div className="hidden md:block md:col-span-4">
          <div className="grid w-full grid-cols-3 gap-1 sm:gap-2">
            <GenericButton
              as={Link}
              to="/"
              variant="heroYellowNavbarTransparent"
              activeOptions={{ exact: true }}
              className="text-center"
            >
              INICIO
            </GenericButton>
            <GenericButton
              as={Link}
              to="/menu"
              variant="heroYellowNavbarTransparent"
              activeOptions={{ exact: true }}
              className="text-center"
            >
              MENÚ
            </GenericButton>
            <GenericButton
              as={Link}
              to="/#nosotros"
              variant="heroYellowNavbarTransparent"
              activeOptions={{ exact: true }}
              className="text-center"
            >
              NOSOTROS
            </GenericButton>
          </div>
        </div>

        {/* Sección 3: Derecha + Hamburguesa en móvil */}
        <div className="col-span-6 flex items-center justify-end justify-self-end gap-2 md:col-span-4 sm:gap-3">
          <CartLink />
          <GenericButton
            as={Link}
            to="/login"
            variant="heroYellowTransparent"
            activeOptions={{ exact: true }}
            className="!py-1 px-3 text-xs hover:scale-100"
          >
            Login
          </GenericButton>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 text-white transition hover:bg-white/10 md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menú desplegable móvil */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-cappibluedark px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <GenericButton
              as={Link}
              to="/"
              variant="heroYellowNavbarTransparent"
              activeOptions={{ exact: true }}
              onClick={() => setIsMenuOpen(false)}
              className="w-full justify-center text-center"
            >
              INICIO
            </GenericButton>
            <GenericButton
              as={Link}
              to="/menu"
              variant="heroYellowNavbarTransparent"
              activeOptions={{ exact: true }}
              onClick={() => setIsMenuOpen(false)}
              className="w-full justify-center text-center"
            >
              MENÚ
            </GenericButton>
            <GenericButton
              as={Link}
              to="/#nosotros"
              variant="heroYellowNavbarTransparent"
              activeOptions={{ exact: true }}
              onClick={() => setIsMenuOpen(false)}
              className="w-full justify-center text-center"
            >
              NOSOTROS
            </GenericButton>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-cappiblue py-12 text-hero-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 md:flex-row">
        <p className="font-display text-xl font-extrabold">CapyWaffles</p>
        <p className="text-sm opacity-70">Waffles artesanales · Pollo crujiente · Helados · Refrescos</p>
        <p className="text-sm opacity-50">© {new Date().getFullYear()} CapyWaffles</p>
      </div>
    </footer>
  );
}
