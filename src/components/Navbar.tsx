import { Link } from "@tanstack/react-router";
import { Moon, ShoppingBag, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import GenericButton from "./ui/button/GenericButton";

function CartLink() {
  const { count } = useCart();
  return (
    <Link to="/carrito" aria-label="Ver carrito" className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:scale-105 hover:border-primary">
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">{count}</span>
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
  const link = "text-sm font-semibold uppercase tracking-wide text-white transition hover:text-primary";
  useEffect(() => {
    const handleScroll = () => {
      // Si baja más de 20px, activamos el fondo
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Verificar al cargar
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 1. Las clases de los enlaces cambian según el scroll
  // (Si el fondo es amarillo, el texto debe ser oscuro o primary para que se lea)
  const linkBase = "text-sm font-semibold uppercase tracking-wide transition-colors duration-300";
  const linkColor = isScrolled ? "text-foreground/90 hover:text-primary" : "text-white hover:text-secondary";
  return (
    // <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${isScrolled
      ? "bg-cappibluedark border-transparent shadow-md backdrop-blur-md" // Fondo Amarillo al bajar
      : "bg-transparent border-transparent backdrop-blur-sm" // Transparente al inicio
      }`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        {/* <Link to="/" className="font-display text-2xl font-extrabold text-primary">
          Capy<span className="text-foreground">Waffles</span>
        </Link> */}
        {/* <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/images/login/cappi-waffle-logo.png"
            alt="CapyWaffles Logo"
            className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </Link> */}
        <div className="hidden items-center gap-8 md:flex">
          {/* <Link to="/" className={link} activeProps={{ className: "text-white" }} activeOptions={{ exact: true }}>Inicio</Link> */}
          <GenericButton
            as={Link}
            to="/"
            variant="heroYellowNavbarTransparent"
            activeOptions={{ exact: true }}
          >
            Inicio
          </GenericButton>
          {/* <Link to="/menu" className={link} activeProps={{ className: "text-white" }}>Menú</Link> */}
          <GenericButton
            as={Link}
            to="/menu"
            variant="heroYellowNavbarTransparent"
            activeOptions={{ exact: true }}
          >
            Menú
          </GenericButton>
          {/* <a href="/#nosotros" className={link}>Nosotros</a> */}
          <GenericButton
            as={Link}
            to="/#nosotros"
            variant="heroYellowNavbarTransparent"
            activeOptions={{ exact: true }}
          >
            Nosotros
          </GenericButton>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <CartLink />
          <Link to="/menu" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
            Pedir ahora
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-hero py-12 text-hero-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 md:flex-row">
        <p className="font-display text-xl font-extrabold">CapyWaffles</p>
        <p className="text-sm opacity-70">Waffles artesanales · Pollo crujiente · Helados · Refrescos</p>
        <p className="text-sm opacity-50">© {new Date().getFullYear()} CapyWaffles</p>
      </div>
    </footer>
  );
}
