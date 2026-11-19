import * as React from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "4xl" | "full";

// 1. Tipamos la acción que se devuelve al padre
export interface ModalAction {
    id: string;
    label: string;
    variant?: "primary" | "secondary" | "danger" | "outline";
    isProcessing?: boolean;
}

export interface ResponsiveModalBlankProps {
    isOpen: boolean;
    onClose: () => void;
    size?: ModalSize;
    children: React.ReactNode;
    hideCloseButton?: boolean;
    contentClassName?: string;
    /** Callback que se dispara cuando el usuario interactúa con una acción */
    onAction?: (actionId: string) => void;
    /** Arreglo de acciones para renderizar botones (opcional) */
    actions?: ModalAction[];
}

const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-sm w-full max-h-[85vh]",
    md: "max-w-md w-full max-h-[85vh]",
    lg: "max-w-lg w-full max-h-[85vh]",
    xl: "max-w-2xl w-full max-h-[85vh]",
    "4xl": "max-w-6xl w-full max-h-[85vh]",
    full: "max-w-[95vw] h-[90vh] w-full",
};

// Clases para los botones basadas en variantes
const buttonVariants = {
    primary: "bg-[#3BC1D8] hover:bg-[#2ba6bb] text-black font-bold",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold",
    danger: "bg-red-500 hover:bg-red-600 text-white font-bold",
    outline: "border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold",
};

export function ResponsiveModalBlank({
    isOpen,
    onClose,
    size = "md",
    children,
    hideCloseButton = false,
    contentClassName = "",
    onAction,
    actions = [],
}: ResponsiveModalBlankProps) {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className={`bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col relative z-10 transform transition-all animate-in zoom-in-95 duration-200 ${sizeClasses[size]}`}
            >
                {!hideCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-20 text-slate-500 hover:text-slate-800 hover:bg-slate-100 p-1.5 rounded-lg transition-all cursor-pointer bg-white/80 backdrop-blur-sm shadow-sm"
                        aria-label="Cerrar modal"
                    >
                        <X size={18} />
                    </button>
                )}

                <div className={`flex-1 overflow-y-auto w-full ${contentClassName}`}>
                    {children}
                </div>

                {/* 2. Renderizador dinámico de acciones en el footer del modal (opcional) */}
                {actions.length > 0 && (
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3 flex-wrap">
                        {actions.map((action) => (
                            <button
                                key={action.id}
                                onClick={() => onAction?.(action.id)}
                                disabled={action.isProcessing}
                                className={`px-6 py-3 rounded-lg transition-colors duration-200 text-sm ${buttonVariants[action.variant || "primary"]} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {action.isProcessing ? "Procesando..." : action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>,
        document.body,
    );
}