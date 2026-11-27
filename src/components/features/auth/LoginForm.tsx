import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { authService } from "@/services/authService";

export function LoginForm() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage("Por favor, ingresa tu usuario/correo y contraseña.");
      return;
    }

    try {
      setLoading(true);
      const res = await authService.login({
        identifier: identifier.trim(),
        password,
        rememberMe,
      });

      if (res.success) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          navigate({ to: "/menu" });
        }, 1000);
      } else {
        setErrorMessage(res.message);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Ocurrió un error al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-card shadow-soft border border-border/70">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* COLUMNA 1: Banner / Registro con Imagen */}
        <div className="relative flex flex-col overflow-hidden text-white lg:col-span-5 min-h-[500px]">
          {/* Fondo decorativo sutil */}
          {/* <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cappiyellow/15 blur-3xl"></div> */}

          {/* Sección Superior: Texto y Botón de Registro */}
          <div className="relative z-10 text-center space-y-4 pt-8 px-8 pb-4 bg-gradient-to-b from-black/50 to-transparent">
            <p className="text-base font-medium text-slate-100/90 leading-relaxed max-w-sm mx-auto">
              ¿Aún no tienes una cuenta? Regístrate para realizar pedidos y acceder a múltiples beneficios.
            </p>
            <div>
              <Link
                to="/registro"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cappiyellow px-7 py-3 text-sm font-bold text-cappibluedark shadow-lift transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:shadow-xl active:scale-95"
              >
                <span>Regístrate Ahora</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Imagen Central / Inferior */}
          <div className="absolute inset-0 z-0">
            <div className="group relative h-full w-full overflow-hidden transition duration-500">
              <img
                src="/images/page/one/login-image.webp"
                alt="CapyWaffles Delicias"
                className="h-full w-full object-cover"
                loading="eager"
                onError={(e) => {
                  // Fallback visual en caso de ruta
                  e.currentTarget.src = "/images/login/cappi-waffle-logo.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-xs font-semibold tracking-wider uppercase text-yellow-300">
                  Waffles & Chicken Crunch
                </span>
              </div>
            </div>
          </div>

          {/* Marca / Branding inferior */}
          <div className="relative z-10 mt-4 text-center">
            <span className="text-xs text-slate-400">CapyWaffles · El sabor artesanal que te alegra</span>
          </div>
        </div>

        {/* COLUMNA 2: Formulario de Inicio de Sesión */}
        <div className="flex flex-col justify-center bg-card p-8 sm:p-12 lg:col-span-7">
          <div className="mx-auto w-full max-w-md">
            {/* Header del Formulario */}
            <div className="mb-8">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Bienvenido
              </span>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground font-display sm:text-4xl">
                Iniciar Sesión
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Ingresa tus credenciales para ordenar tus combos favoritos y acumular puntos.
              </p>
            </div>

            {/* Mensajes de Alerta */}
            {errorMessage && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-3.5 text-sm text-green-700 dark:text-green-400 animate-in fade-in slide-in-from-top-1 duration-200">
                <span className="font-semibold">{successMessage}</span>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Campo Usuario / Correo */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/80">
                  Usuario o Correo Electrónico
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="ej. capyfan o usuario@correo.com"
                    className="w-full rounded-xl border border-input bg-background/60 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground/80">
                    Contraseña
                  </label>
                  <a
                    href="#olvide-password"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Para recuperar tu contraseña, te enviaremos un enlace a tu correo registrado.");
                    }}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-input bg-background/60 py-3 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition hover:text-foreground"
                    aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Recordarme */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 text-sm text-muted-foreground cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary accent-primary"
                  />
                  <span>Recordar mi sesión</span>
                </label>
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 px-4 font-bold text-primary-foreground shadow-lift transition-all duration-300 hover:bg-primary/90 hover:shadow-xl active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <span>Iniciar Sesión</span>
                )}
              </button>
            </form>

            {/* Separador */}
            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <span className="relative bg-card px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                O continúa como cliente nuevo
              </span>
            </div>

            {/* Enlace rápido de registro */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                ¿Aún no tienes cuenta?{" "}
                <Link
                  to="/registro"
                  className="font-bold text-primary hover:underline hover:text-primary/90"
                >
                  Crea una cuenta aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
