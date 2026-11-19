import { Link, useNavigate } from "@tanstack/react-router";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Mail,
  Phone,
  User,
  Calendar,
  CreditCard,
  MapPin,
  Lock,
  Sparkles,
  Loader2,
  RefreshCw,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import type { RegisterFormData } from "@/types/auth";

const STEPS = [
  { id: 1, label: "Datos de personales" },
  { id: 2, label: "Validación de número" },
  { id: 3, label: "Datos de ingreso" },
  { id: 4, label: "Datos de facturación" },
  { id: 5, label: "Direcciones" },
  { id: 6, label: "Registro exitoso" },
];

export function RegisterForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<RegisterFormData>({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "2000-09-18",
      ci: "",
      phoneCountryCode: "+591",
      phoneNumber: "",
    },
    verification: {
      code: "",
    },
    account: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    billing: {
      needsInvoice: false,
      businessName: "",
      nitCi: "",
    },
    address: {
      city: "La Paz",
      street: "",
      numberOrApartment: "",
      reference: "",
    },
  });

  // UI helpers
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer: any;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Actualizar datos de un paso
  const updatePersonal = (field: keyof typeof formData.personal, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const updateAccount = (field: keyof typeof formData.account, value: string) => {
    setFormData((prev) => ({
      ...prev,
      account: { ...prev.account, [field]: value },
    }));
  };

  const updateBilling = (field: keyof typeof formData.billing, value: any) => {
    setFormData((prev) => ({
      ...prev,
      billing: { ...prev.billing, [field]: value },
    }));
  };

  const updateAddress = (field: keyof typeof formData.address, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  // Enviar código simulado al pasar del paso 1 al 2
  const handleProceedFromPersonal = async () => {
    const { firstName, lastName, email, ci, phoneNumber } = formData.personal;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !ci.trim() || !phoneNumber.trim()) {
      setErrorMsg("Por favor, completa todos los campos obligatorios (*).");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMsg("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      // Invocamos el servicio para simular el envío del código
      const res = await authService.sendVerificationCode(email);
      setSuccessInfo(`Simulación: Código de verificación enviado a tu correo (${email}). Código: ${res.mockCode}`);
      setResendCooldown(30);
      setCurrentStep(2);
    } catch (err: any) {
      setErrorMsg(err?.message || "Error al enviar código de verificación.");
    } finally {
      setLoading(false);
    }
  };

  // Reenviar código
  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await authService.sendVerificationCode(formData.personal.email);
      setSuccessInfo(`Nuevo código enviado a tu correo: ${res.mockCode}`);
      setResendCooldown(30);
    } catch (err: any) {
      setErrorMsg(err?.message || "Error al reenviar código.");
    } finally {
      setLoading(false);
    }
  };

  // Verificar código en paso 2
  const handleVerifyCode = async () => {
    if (!formData.verification.code.trim()) {
      setErrorMsg("Ingresa el código de 6 dígitos que te enviamos.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await authService.verifyCode(formData.verification.code.trim());
      if (res.valid) {
        setSuccessInfo(null);
        setCurrentStep(3);
      } else {
        setErrorMsg(res.message);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Error al verificar código.");
    } finally {
      setLoading(false);
    }
  };

  // Validar datos de ingreso (Paso 3)
  const handleProceedFromAccount = () => {
    const { username, password, confirmPassword } = formData.account;
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Por favor ingresa usuario y contraseña.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }
    setErrorMsg(null);
    setCurrentStep(4);
  };

  // Validar facturación (Paso 4)
  const handleProceedFromBilling = () => {
    if (formData.billing.needsInvoice) {
      if (!formData.billing.businessName?.trim() || !formData.billing.nitCi?.trim()) {
        setErrorMsg("Por favor, ingresa la Razón Social y el NIT/CI para tu factura.");
        return;
      }
    }
    setErrorMsg(null);
    setCurrentStep(5);
  };

  // Finalizar Registro (Paso 5)
  const handleCompleteRegistration = async () => {
    const { street, numberOrApartment } = formData.address;
    if (!street.trim()) {
      setErrorMsg("Por favor, ingresa tu calle o avenida de entrega.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await authService.register(formData);
      if (res.success) {
        setCurrentStep(6);
      } else {
        setErrorMsg(res.message);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Error al crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-card shadow-soft border border-border/70">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* COLUMNA 1: Lateral con Stepper de Pasos */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-background/50 p-8 lg:col-span-4 lg:p-10 border-b lg:border-b-0 lg:border-r border-border">
          {/* Header REGÍSTRATE */}
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-primary font-display sm:text-4xl">
              REGÍSTRATE
            </h1>
            <p className="mt-3 text-sm font-semibold text-foreground/90 leading-snug">
              Regístrate para realizar pedidos y acceder a múltiples beneficios.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="font-bold text-primary underline hover:text-primary/80">
                Inicia sesión
              </Link>
            </p>

            {/* Stepper Vertical */}
            <div className="mt-8 space-y-4">
              {STEPS.map((step) => {
                const isCurrent = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex items-center gap-3">
                    {/* Indicador circular idéntico al diseño */}
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                      {isCompleted ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="h-5 w-5 rounded-full border-[3px] border-[#38B6CD] bg-transparent"></div>
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400">
                          <Check className="h-3.5 w-3.5 stroke-[2] opacity-40" />
                        </div>
                      )}
                    </div>

                    {/* Texto del paso */}
                    <span
                      className={`text-sm tracking-wide ${
                        isCurrent
                          ? "font-bold text-[#38B6CD]"
                          : isCompleted
                          ? "font-medium text-muted-foreground line-through opacity-70"
                          : "text-muted-foreground/80 font-normal"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Imagen / Detalle decorativo inferior (como en la referencia) */}
          <div className="relative mt-8 -mb-10 -ml-10 overflow-hidden pointer-events-none opacity-80 max-w-[240px]">
            <img
              src="/images/page/one/login-image.webp"
              alt="Capy Food"
              className="w-full h-auto object-cover rounded-tr-3xl"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* COLUMNA 2: Formulario dinámico según el paso activo */}
        <div className="flex flex-col justify-between bg-card p-8 sm:p-12 lg:col-span-8">
          <div>
            {/* Mensajes de Alerta */}
            {errorMsg && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive animate-in fade-in duration-200">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successInfo && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#38B6CD]/30 bg-[#38B6CD]/10 p-3.5 text-sm text-[#0c6b7b] dark:text-[#5fd2e5] animate-in fade-in duration-200">
                <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{successInfo}</span>
              </div>
            )}

            {/* PASO 1: DATOS PERSONALES */}
            {currentStep === 1 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-[#5AB7CD] font-display sm:text-3xl">
                    Datos Personales
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ingresa tus datos personales.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Nombre */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Nombre(s) *:
                    </label>
                    <input
                      type="text"
                      value={formData.personal.firstName}
                      onChange={(e) => updatePersonal("firstName", e.target.value)}
                      placeholder="ej. Juan Carlos"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                      required
                    />
                  </div>

                  {/* Apellidos */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Apellido(s) *:
                    </label>
                    <input
                      type="text"
                      value={formData.personal.lastName}
                      onChange={(e) => updatePersonal("lastName", e.target.value)}
                      placeholder="ej. Pérez Gómez"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                      required
                    />
                  </div>

                  {/* Correo Electrónico (Requerimiento explícito del usuario) */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Correo Electrónico *:
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        value={formData.personal.email}
                        onChange={(e) => updatePersonal("email", e.target.value)}
                        placeholder="tu.correo@ejemplo.com"
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Fecha de nacimiento */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Fecha de nacimiento *:
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.personal.birthDate}
                        onChange={(e) => updatePersonal("birthDate", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Carnet de identidad */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Carnet de identidad *:
                    </label>
                    <input
                      type="text"
                      value={formData.personal.ci}
                      onChange={(e) => updatePersonal("ci", e.target.value)}
                      placeholder="ej. 8394012 LP"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                      required
                    />
                  </div>

                  {/* Teléfono con Bandera */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Teléfono *:
                    </label>
                    <div className="flex rounded-xl border border-border bg-background overflow-hidden focus-within:border-[#5AB7CD] focus-within:ring-2 focus-within:ring-[#5AB7CD]/20">
                      <div className="flex items-center gap-1.5 border-r border-border bg-muted/40 px-3 py-2 text-sm text-foreground">
                        <span className="text-lg">🇧🇴</span>
                        <span className="text-xs font-bold text-muted-foreground">+591</span>
                      </div>
                      <input
                        type="tel"
                        value={formData.personal.phoneNumber}
                        onChange={(e) => updatePersonal("phoneNumber", e.target.value)}
                        placeholder="71234567"
                        className="w-full bg-transparent px-4 py-2.5 text-sm text-foreground focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">* Campos obligatorios</span>
                  <button
                    type="button"
                    onClick={handleProceedFromPersonal}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lift transition hover:bg-primary/90 hover:shadow-xl active:scale-95 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Siguiente"}
                  </button>
                </div>
              </div>
            )}

            {/* PASO 2: VALIDACIÓN DE CÓDIGO */}
            {currentStep === 2 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-[#5AB7CD] font-display sm:text-3xl">
                    Validación de Número
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ingresa el código de 6 dígitos que hemos enviado a tu correo ({formData.personal.email}) y teléfono ({formData.personal.phoneNumber}).
                  </p>
                </div>

                <div className="mx-auto max-w-sm space-y-6 py-4">
                  <div className="rounded-2xl border border-dashed border-[#5AB7CD]/40 bg-[#5AB7CD]/5 p-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Modo Simulación:</strong> Revisa tu bandeja simulada o ingresa el código <span className="font-mono font-bold text-[#5AB7CD]">123456</span>.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-center block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Código de Verificación
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.verification.code}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          verification: { code: e.target.value.replace(/\D/g, "") },
                        }))
                      }
                      placeholder="123456"
                      className="w-full text-center tracking-[0.5em] font-mono text-2xl font-bold py-3 rounded-xl border border-border bg-background focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      disabled={resendCooldown > 0 || loading}
                      onClick={handleResendCode}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline disabled:opacity-50 disabled:no-underline cursor-pointer"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                      {resendCooldown > 0
                        ? `Reenviar código en ${resendCooldown}s`
                        : "Reenviar código a mi correo"}
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Atrás</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lift transition hover:bg-primary/90 hover:shadow-xl active:scale-95 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Siguiente"}
                  </button>
                </div>
              </div>
            )}

            {/* PASO 3: DATOS DE INGRESO */}
            {currentStep === 3 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-[#5AB7CD] font-display sm:text-3xl">
                    Datos de Ingreso
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Crea tu usuario y contraseña segura para acceder a CapyWaffles.
                  </p>
                </div>

                <div className="space-y-4 max-w-lg">
                  {/* Usuario */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Nombre de Usuario *:
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={formData.account.username}
                        onChange={(e) => updateAccount("username", e.target.value)}
                        placeholder="ej. capywaffle_lover"
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Contraseña *:
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.account.password}
                        onChange={(e) => updateAccount("password", e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Confirmar Contraseña *:
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.account.confirmPassword}
                        onChange={(e) => updateAccount("confirmPassword", e.target.value)}
                        placeholder="Repite tu contraseña"
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Atrás</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleProceedFromAccount}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lift transition hover:bg-primary/90 hover:shadow-xl active:scale-95 cursor-pointer"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {/* PASO 4: DATOS DE FACTURACIÓN */}
            {currentStep === 4 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-[#5AB7CD] font-display sm:text-3xl">
                    Datos de Facturación
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Indica si deseas factura con NIT o si tus compras serán como consumidor final.
                  </p>
                </div>

                <div className="space-y-6 max-w-lg">
                  {/* Selector Switch / Checkbox */}
                  <div className="flex items-center justify-between rounded-2xl border border-border bg-background/50 p-4">
                    <div className="space-y-0.5">
                      <span className="text-sm font-bold text-foreground">¿Deseas emitir factura a un NIT?</span>
                      <p className="text-xs text-muted-foreground">
                        Si desactivas esta opción, se emitirá a nombre de Consumidor Final.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.billing.needsInvoice}
                      onChange={(e) => updateBilling("needsInvoice", e.target.checked)}
                      className="h-5 w-5 rounded border-input text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                  </div>

                  {formData.billing.needsInvoice && (
                    <div className="space-y-4 rounded-2xl border border-border bg-background p-5 animate-in fade-in duration-200">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                          Razón Social / Nombre de Facturación *:
                        </label>
                        <input
                          type="text"
                          value={formData.billing.businessName}
                          onChange={(e) => updateBilling("businessName", e.target.value)}
                          placeholder="ej. Empresa S.R.L. o Nombre Personal"
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                          NIT / Carnet de Identidad *:
                        </label>
                        <input
                          type="text"
                          value={formData.billing.nitCi}
                          onChange={(e) => updateBilling("nitCi", e.target.value)}
                          placeholder="ej. 1029384019"
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-1 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Atrás</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleProceedFromBilling}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lift transition hover:bg-primary/90 hover:shadow-xl active:scale-95 cursor-pointer"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {/* PASO 5: DIRECCIONES */}
            {currentStep === 5 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-[#5AB7CD] font-display sm:text-3xl">
                    Direcciones
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ingresa tu dirección principal de entrega para que tus waffles lleguen rápido y calientitos.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Ciudad *:
                    </label>
                    <select
                      value={formData.address.city}
                      onChange={(e) => updateAddress("city", e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                    >
                      <option value="La Paz">La Paz</option>
                      <option value="El Alto">El Alto</option>
                      <option value="Cochabamba">Cochabamba</option>
                      <option value="Santa Cruz">Santa Cruz</option>
                      <option value="Sucre">Sucre</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                      Calle / Avenida *:
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={formData.address.street}
                        onChange={(e) => updateAddress("street", e.target.value)}
                        placeholder="ej. Av. 6 de Agosto"
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Número de Casa / Dpto / Piso:
                    </label>
                    <input
                      type="text"
                      value={formData.address.numberOrApartment}
                      onChange={(e) => updateAddress("numberOrApartment", e.target.value)}
                      placeholder="ej. #2450 Edificio Bella Vista Piso 4A"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Referencia de entrega:
                    </label>
                    <input
                      type="text"
                      value={formData.address.reference}
                      onChange={(e) => updateAddress("reference", e.target.value)}
                      placeholder="ej. Frente a farmacia, portón negro"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#5AB7CD] focus:outline-none focus:ring-2 focus:ring-[#5AB7CD]/20"
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-1 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Atrás</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCompleteRegistration}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lift transition hover:bg-primary/90 hover:shadow-xl active:scale-95 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Creando cuenta...</span>
                      </>
                    ) : (
                      <span>Finalizar Registro</span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* PASO 6: REGISTRO EXITOSO */}
            {currentStep === 6 && (
              <div className="py-6 text-center animate-in zoom-in-95 duration-500">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 shadow-soft">
                  <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
                </div>

                <h2 className="mt-5 text-3xl font-black text-foreground font-display">
                  ¡Registro Exitoso!
                </h2>
                <p className="mt-2 text-base font-medium text-muted-foreground max-w-md mx-auto">
                  ¡Bienvenido a la familia CapyWaffles,{" "}
                  <strong className="text-foreground">{formData.personal.firstName}</strong>! Tu cuenta ha sido creada exitosamente.
                </p>

                <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4 max-w-md mx-auto text-left text-xs space-y-1.5 text-muted-foreground">
                  <p>
                    <strong>Usuario:</strong> {formData.account.username || formData.personal.email}
                  </p>
                  <p>
                    <strong>Correo:</strong> {formData.personal.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {formData.personal.phoneCountryCode} {formData.personal.phoneNumber}
                  </p>
                  <p>
                    <strong>Ciudad de entrega:</strong> {formData.address.city}
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/menu"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 font-bold text-white shadow-lift transition hover:bg-primary/90 hover:scale-105"
                  >
                    <span>Ir al Menú a Pedir</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-border px-8 py-3.5 font-bold text-foreground hover:bg-muted transition"
                  >
                    Ir al Inicio
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
