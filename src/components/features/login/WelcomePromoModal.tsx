import { ResponsiveModal } from "@/components/ui/modal/ResponsiveModal";
import { ResponsiveModalBlank } from "@/components/ui/modal/ResponsiveModalBlank";

interface WelcomePromoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClaimDeal: () => void;
    onViewMenu: () => void;
}

export function WelcomePromoModal({ isOpen, onClose, onClaimDeal, onViewMenu }: WelcomePromoModalProps) {
    const handleClaimDeal = () => {
        // Aquí iría la lógica para aplicar el cupón (ej. guardar en contexto/zustand)
        console.log("Cupón aplicado");
        onClose();
    };

    return (
        <ResponsiveModalBlank
            isOpen={isOpen}
            onClose={onClose}
            size="4xl"
        // Definimos las acciones que el modal puede emitir
        // actions={[
        //     { id: "view-menu", label: "Ver Menú", variant: "outline" },
        //     { id: "claim", label: "Reclamar Oferta", variant: "primary" },
        // ]}
        // Aquí atrapamos la acción y decidimos qué hacer
        // onAction={(actionId) => {
        //     if (actionId === "claim") {
        //         onClaimDeal();
        //         onClose();
        //     } else if (actionId === "view-menu") {
        //         onViewMenu();
        //         onClose();
        //     }
        // }}
        >
            {/* Contenedor principal en Grid para 2 columnas en pantallas grandes */}
            <div className="flex flex-col md:flex-row h-full min-h-[400px]">

                {/* Columna Izquierda: Imagen (Oculta en móviles para ahorrar espacio) */}
                <div className="hidden md:block w-1/2 relative bg-gray-100 rounded-l-lg overflow-hidden">
                    {/* Reemplaza esto por tu imagen real */}
                    <img
                        src="https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=1000&auto=format&fit=crop"
                        alt="Waffles Promoción"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Columna Derecha: Contenido */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 text-center space-y-6">

                    {/* Logo (Reemplaza con tu logo) */}
                    {/* <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🧇</span>
                        </div>
                        <span className="font-bold text-lg tracking-wider text-slate-800">
                            TU WAFFLE
                        </span>
                    </div> */}

                    <div>
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none mb-2">
                            Envío Gratis
                        </h2>
                        <p className="text-slate-600 font-medium">
                            En tu primer pedido superior a 20 Bs
                        </p>
                    </div>

                    <div className="w-full pt-4 space-y-3">
                        <button
                            onClick={handleClaimDeal}
                            className="w-full bg-[#3BC1D8] hover:bg-[#2ba6bb] text-[#052A3D] font-bold py-3 px-4 rounded-md transition-colors duration-200 uppercase tracking-wide text-sm shadow-sm hover:cursor-pointer"
                        >
                            Reclamar Oferta
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-semibold py-3 px-4 rounded-md transition-colors duration-200 text-sm hover:cursor-pointer"
                        >
                            No, gracias
                        </button>
                    </div>
                </div>
            </div>
        </ResponsiveModalBlank>
    );
}