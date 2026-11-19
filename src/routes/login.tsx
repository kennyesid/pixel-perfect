import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/features/auth/LoginForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar Sesión — CapyWaffles" },
      { name: "description", content: "Inicia sesión en CapyWaffles para realizar tus pedidos y acceder a múltiples beneficios." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
