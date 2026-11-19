// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createFileRoute('/privacidad')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/privacidad"!</div>
// }


import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidad")({
    head: () => ({
        meta: [
            { title: "Política de Privacidad — CapyWaffles" },
            { name: "description", content: "Política de privacidad y tratamiento de datos de CapyWaffles." },
        ],
    }),
    component: Privacidad,
});

function Privacidad() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="mx-auto max-w-4xl px-5">

                {/* Encabezado */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-foreground md:text-5xl font-display">
                        Política de Privacidad
                    </h1>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>

                {/* Contenido Legal en una tarjeta */}
                <div className="rounded-2xl bg-card p-8 shadow-soft md:p-12 border border-border/50 text-foreground">

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-3 text-primary">1. Información que recopilamos</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                En CapyWaffles respetamos tu privacidad. Cuando decides iniciar sesión utilizando tu cuenta de Google,
                                recopilamos únicamente la información básica de tu perfil: tu <strong>nombre</strong>, <strong>dirección de correo electrónico</strong> y <strong>foto de perfil</strong>.
                                No tenemos acceso a tu contraseña de Google ni a ningún otro dato personal de tu cuenta.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3 text-primary">2. Uso de la información</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                La información recopilada se utiliza exclusivamente para los siguientes fines:
                            </p>
                            <ul className="list-disc list-inside mt-3 text-muted-foreground space-y-2">
                                <li>Crear y gestionar tu cuenta de usuario en nuestra plataforma.</li>
                                <li>Procesar tus pedidos y enviarte notificaciones sobre el estado de tu compra al correo electrónico proporcionado.</li>
                                <li>Personalizar tu experiencia mostrando tu foto y nombre en la tienda.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3 text-primary">3. Compartición de datos</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                <strong>No vendemos, alquilamos ni compartimos tu información personal con terceros.</strong> Tus datos
                                solo son utilizados internamente por CapyWaffles para los fines descritos anteriormente.
                                Trabajamos con proveedores de servicios de pago seguros que manejan tu información financiera de forma encriptada,
                                pero no compartimos tus datos de perfil con ellos.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3 text-primary">4. Derechos del usuario</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento.
                                Si deseas eliminar tu cuenta y todos los datos asociados a ella, puedes solicitarlo enviando un correo electrónico a
                                <span className="font-semibold text-foreground"> soporte@capywaffles.com</span>.
                                Procesaremos tu solicitud en un plazo máximo de 72 horas.
                            </p>
                        </section>
                    </div>

                    {/* Botón de regreso */}
                    <div className="mt-12 pt-8 border-t border-border flex justify-center">
                        <Link
                            to="/"
                            className="rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                        >
                            Volver al inicio
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}