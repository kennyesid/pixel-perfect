// import { useState } from "react";
// import { MessageCircle, X } from "lucide-react";
// import { chatbotData } from "@/lib/chatbot/chatbotData";

// export function Chatbot() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [currentNodeId, setCurrentNodeId] = useState("root");
//     const [history, setHistory] = useState([chatbotData["root"]?.message]);

//     const handleOptionClick = (nextId: string | null, label: string, link?: string) => {
//         if (link) {
//             window.location.href = link;
//             return;
//         }

//         if (!nextId) return;

//         const nextNode = chatbotData[nextId];
//         setHistory((prev) => [...prev, `Tú: ${label}`, nextNode?.message]);
//         setCurrentNodeId(nextId);
//     };

//     return (
//         <div className="fixed bottom-6 right-6 z-50">
//             {!isOpen && (
//                 <button
//                     onClick={() => setIsOpen(true)}
//                     className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-cappiyellow shadow-lift ring-4 ring-white/50 transition-all duration-300 hover:scale-110 hover:rotate-6 hover:cursor-pointer"
//                 >
//                     <img
//                         src="/images/chatbot/icon-chatbot.png"
//                         alt="Abrir chat de soporte"
//                         className="h-full w-full object-cover"
//                     />
//                 </button>
//             )}
//             {isOpen && (
//                 <div className="flex h-[500px] w-[350px] bg-white flex-col ">
//                     <div className="flex items-center justify-between bg-cappiblue p-4 text-cappigraylight">
//                         <div className="flex items-center gap-2">

//                             <div>
//                                 <h3 className="font-bold text-sm ">CapyBot</h3>
//                                 <p className="text-xs ">En línea</p>
//                             </div>
//                         </div>
//                         <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
//                             <X size={20} />
//                         </button>
//                     </div>
//                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                         {history.map((msg, i) => (
//                             <div key={i} className={`flex ${msg?.startsWith("Tú:") ? "justify-end" : "justify-start"}`}>
//                                 <div className={`max-w-[80%] border-1 rounded-2xl p-3 text-sm ${msg?.startsWith("Tú:")
//                                     ? "rounded-tr-sm border-cappiblue  text-cappiblue "
//                                     : "bg-cappiblue border border-border text-cappigraylight rounded-tl-sm"
//                                     }`}>
//                                     {msg?.replace("Tú: ", "")}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="p-4 bg-card border-t border-border flex flex-col gap-2">
//                         {chatbotData[currentNodeId]?.options.map((opt, i) => (
//                             <button
//                                 key={i}
//                                 onClick={() => handleOptionClick(opt.nextId, opt.label, opt.isExternalLink)}
//                                 className="w-full text-left rounded-lg border border-cappiblue p-2 text-sm text-cappiblue bg-cappiyellow/20 font-medium transition hover:bg-cappiyellow/60"
//                             >
//                                 {opt.label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// src/components/chat/Chatbot.tsx
import { useState, useEffect, useCallback } from "react";
import { MessageCircle, MessageSquare, X } from "lucide-react";
import { chatbotData } from "@/lib/chatbot/chatbotData";

// Tipado estricto para las opciones del bot
interface ChatOption {
    label: string;
    nextId: string | null;
    isExternalLink?: string;
}

interface ChatbotNode {
    message: string;
    options: ChatOption[];
}

const STORAGE_KEY = "capybot_teaser_dismissed";

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showTeaser, setShowTeaser] = useState(false);
    const [currentNodeId, setCurrentNodeId] = useState("root");
    const [history, setHistory] = useState<string[]>([
        chatbotData["root"]?.message ?? "",
    ]);

    // Mostrar el teaser tras un breve delay si el usuario no lo ha cerrado antes
    useEffect(() => {
        const dismissed = localStorage.getItem(STORAGE_KEY) === "true";
        if (dismissed) return;

        const timer = setTimeout(() => setShowTeaser(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const dismissTeaser = useCallback(() => {
        setShowTeaser(false);
        localStorage.setItem(STORAGE_KEY, "true");
    }, []);

    const openChat = useCallback(() => {
        setIsOpen(true);
        setShowTeaser(false);
    }, []);

    const handleOptionClick = (
        nextId: string | null,
        label: string,
        link?: string
    ) => {
        if (link) {
            window.location.href = link;
            return;
        }
        if (!nextId) return;

        const nextNode: ChatbotNode | undefined = chatbotData[nextId];
        setHistory((prev) => [
            ...prev,
            `Tú: ${label}`,
            nextNode?.message ?? "Sin respuesta disponible.",
        ]);
        setCurrentNodeId(nextId);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* ---- Teaser Card (mensaje proactivo) ---- */}
            {showTeaser && !isOpen && (
                <div
                    role="status"
                    aria-live="polite"
                    style={{ borderRadius: '1rem' }} // 👈 Fuerza el redondeo aquí también
                    className="relative w-[320px] animate-fade-slide-in bg-cappiyellow p-4 pr-9 text-sm leading-relaxed text-cappiblue shadow-2xl"
                >
                    <div className="flex items-start gap-3">
                        <MessageSquare
                            size={20}
                            className="mt-0.5 shrink-0 text-cappiblue font-bold"
                            aria-hidden="true"
                        />
                        <p>
                            Hola, puedo ponerlo en contacto con un representante o
                            responder a las preguntas que tenga.
                        </p>
                    </div>

                    {/* Botón cerrar teaser */}
                    <button
                        onClick={dismissTeaser}
                        aria-label="Cerrar mensaje de bienvenida"
                        style={{ borderRadius: '0.5rem' }} // 👈 Forzamos el redondeo del botón de cerrar también
                        className="absolute right-2 top-2 p-1 text-cappiblue transition hover:bg-white/10 hover:text-white hover:cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="relative">
                <button
                    onClick={openChat}
                    aria-label="Abrir chat de soporte"
                    style={{ borderRadius: '1rem' }} // <-- Fuerza el redondeo
                    className="flex h-16 w-16 items-center justify-center overflow-hidden bg-cappiyellow text-white shadow-xl transition-all duration-200 hover:bg-cappiblue hover:text-white hover:cursor-pointer"
                >
                    <MessageSquare size={28} strokeWidth={1.8} aria-hidden="true" className="text-cappiblue hover:text-white" />
                </button>
            </div>

            {/* ---- Ventana del Chat (sin cambios sustanciales) ---- */}
            {isOpen && (
                <div className="flex h-[500px] w-[350px] flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
                    <div className="flex items-center justify-between bg-cappiblue p-4 text-cappigraylight">
                        <div className="flex items-center gap-2">
                            <div>
                                <h3 className="text-sm font-bold">CapyBot</h3>
                                <p className="text-xs">En línea</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Cerrar chat"
                            className="rounded p-1 hover:bg-white/20"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto p-4">
                        {history.map((msg, i) => {
                            const isUser = msg?.startsWith("Tú:");
                            return (
                                <div
                                    key={i}
                                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl border p-3 text-sm ${isUser
                                            ? "rounded-tr-sm border-cappiblue text-cappiblue"
                                            : "rounded-tl-sm border-border bg-cappiblue text-cappigraylight"
                                            }`}
                                    >
                                        {msg?.replace("Tú: ", "")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-2 border-t border-border bg-card p-4">
                        {chatbotData[currentNodeId]?.options.map((opt: ChatOption, i: number) => (
                            <button
                                key={i}
                                onClick={() =>
                                    handleOptionClick(opt.nextId, opt.label, opt.isExternalLink)
                                }
                                className="w-full rounded-lg border border-cappiblue bg-cappiyellow/20 p-2 text-left text-sm font-medium text-cappiblue transition hover:bg-cappiyellow/60"
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}