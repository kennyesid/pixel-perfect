import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "@/components/features/auth/RegisterForm";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Registro — CapyWaffles" },
      { name: "description", content: "Regístrate en CapyWaffles para realizar pedidos y acceder a múltiples beneficios." },
    ],
  }),
  component: RegistroPage,
});

function RegistroPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <RegisterForm />
    </div>
  );
}
