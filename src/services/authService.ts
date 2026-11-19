import type {
  AuthResponse,
  AuthUser,
  LoginCredentials,
  RegisterFormData,
} from "@/types/auth";

const USER_SESSION_KEY = "capy_auth_user";
const LAST_VERIFICATION_CODE_KEY = "capy_mock_verification_code";

/**
 * Servicio de Autenticación y Registro de CapyWaffles.
 * Actualmente funciona de manera simulada con retrasos realistas y almacenamiento local.
 * Listo para conectar con el backend (Supabase, API REST, etc.).
 */
export const authService = {
  /**
   * Iniciar sesión con correo o usuario y contraseña
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulamos latencia de red
    await new Promise((resolve) => setTimeout(resolve, 900));

    // TODO: [BACKEND] Reemplazar con llamada real a tu endpoint o cliente Supabase:
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: credentials.identifier,
    //   password: credentials.password,
    // });
    // if (error) throw error;

    if (!credentials.identifier || !credentials.password) {
      return {
        success: false,
        message: "Por favor, completa todos los campos requeridos.",
      };
    }

    if (credentials.password.length < 6) {
      return {
        success: false,
        message: "La contraseña debe tener al menos 6 caracteres.",
      };
    }

    // Usuario simulado exitoso
    const mockUser: AuthUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: credentials.identifier.includes("@")
        ? credentials.identifier.split("@")[0]
        : credentials.identifier,
      email: credentials.identifier.includes("@")
        ? credentials.identifier
        : `${credentials.identifier}@capywaffles.com`,
      username: credentials.identifier,
      phone: "+591 71234567",
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(mockUser));
      } catch (err) {
        console.error("[authService] Error al guardar sesión:", err);
      }
    }

    return {
      success: true,
      message: "¡Bienvenido de vuelta a CapyWaffles!",
      user: mockUser,
      token: "mock-jwt-token-" + Date.now(),
    };
  },

  /**
   * Enviar código de verificación al correo o teléfono
   */
  async sendVerificationCode(destination: string): Promise<{ success: boolean; message: string; mockCode: string }> {
    // Simulamos latencia de envío
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generamos un código simulado de 6 dígitos
    const mockCode = "123456";

    // TODO: [BACKEND] Reemplazar con envío real de OTP por SMS o Correo:
    // await fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ destination }) });

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(LAST_VERIFICATION_CODE_KEY, mockCode);
      } catch (err) {
        console.error("[authService] Error guardando código OTP:", err);
      }
    }

    return {
      success: true,
      message: `Código enviado satisfactoriamente a ${destination}. (Código de prueba: ${mockCode})`,
      mockCode,
    };
  },

  /**
   * Validar el código de 6 dígitos ingresado
   */
  async verifyCode(code: string): Promise<{ valid: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // TODO: [BACKEND] Reemplazar con verificación real en tu servidor:
    // const res = await fetch('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ code }) });

    // Código de prueba válido: '123456' o el guardado en sesión
    const savedCode = typeof window !== "undefined" ? sessionStorage.getItem(LAST_VERIFICATION_CODE_KEY) : null;
    const isValid = code === "123456" || (savedCode && code === savedCode);

    if (isValid) {
      return {
        valid: true,
        message: "¡Código verificado con éxito!",
      };
    }

    return {
      valid: false,
      message: "El código ingresado es incorrecto o ha expirado. (Prueba con 123456)",
    };
  },

  /**
   * Registrar completamente al usuario con todos los pasos del formulario
   */
  async register(formData: RegisterFormData): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // TODO: [BACKEND] Reemplazar con inserción real en la base de datos o registro de usuario:
    // const { data, error } = await supabase.auth.signUp({
    //   email: formData.personal.email,
    //   password: formData.account.password,
    //   options: {
    //     data: {
    //       first_name: formData.personal.firstName,
    //       last_name: formData.personal.lastName,
    //       ci: formData.personal.ci,
    //       phone: `${formData.personal.phoneCountryCode}${formData.personal.phoneNumber}`,
    //       birth_date: formData.personal.birthDate,
    //       billing: formData.billing,
    //       address: formData.address,
    //     }
    //   }
    // });

    const newUser: AuthUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: `${formData.personal.firstName} ${formData.personal.lastName}`.trim(),
      email: formData.personal.email,
      username: formData.account.username || formData.personal.email.split("@")[0],
      phone: `${formData.personal.phoneCountryCode} ${formData.personal.phoneNumber}`,
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(newUser));
      } catch (err) {
        console.error("[authService] Error al guardar nuevo usuario:", err);
      }
    }

    return {
      success: true,
      message: "¡Tu cuenta ha sido creada exitosamente! Bienvenido a CapyWaffles.",
      user: newUser,
      token: "mock-jwt-token-" + Date.now(),
    };
  },

  /**
   * Obtener el usuario autenticado actualmente
   */
  getCurrentUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(USER_SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    // TODO: [BACKEND] await supabase.auth.signOut();
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_SESSION_KEY);
    }
  },
};
