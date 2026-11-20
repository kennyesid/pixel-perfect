import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { chatbotData } from "@/lib/chatbot/chatbotData";

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentNodeId, setCurrentNodeId] = useState("root");
    const [history, setHistory] = useState([chatbotData["root"]?.message]);

    const handleOptionClick = (nextId: string | null, label: string, link?: string) => {
        if (link) {
            window.location.href = link; // O usa navigate() de TanStack
            return;
        }

        if (!nextId) return;

        // Agregamos la pregunta del usuario al historial y la respuesta del bot
        const nextNode = chatbotData[nextId];
        setHistory((prev) => [...prev, `Tú: ${label}`, nextNode?.message]);
        setCurrentNodeId(nextId);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Botón flotante */}
            {!isOpen && (
                // <button
                //     onClick={() => setIsOpen(true)}
                //     className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lift transition hover:scale-110"
                // >
                //     <MessageCircle size={28} />
                // </button>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-cappiyellow shadow-lift ring-4 ring-white/50 transition-all duration-300 hover:scale-110 hover:rotate-6 hover:cursor-pointer"
                >
                    <img
                        src="/images/chatbot/icon-chatbot.png"
                        alt="Abrir chat de soporte"
                        className="h-full w-full object-cover"
                    />
                </button>
            )}

            {/* Ventana del Chat */}
            {isOpen && (
                <div className="flex h-[500px] w-[350px] bg-white flex-col ">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-cappiblue p-4 text-cappigraylight">
                        <div className="flex items-center gap-2">

                            <div>
                                <h3 className="font-bold text-sm ">CapyBot</h3>
                                <p className="text-xs ">En línea</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Historial de mensajes */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {history.map((msg, i) => (
                            <div key={i} className={`flex ${msg?.startsWith("Tú:") ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] border-1 rounded-2xl p-3 text-sm ${msg?.startsWith("Tú:")
                                    ? "rounded-tr-sm border-cappiblue  text-cappiblue "
                                    : "bg-cappiblue border border-border text-cappigraylight rounded-tl-sm"
                                    }`}>
                                    {msg?.replace("Tú: ", "")}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Opciones dinámicas (Botones) */}
                    <div className="p-4 bg-card border-t border-border flex flex-col gap-2">
                        {chatbotData[currentNodeId]?.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleOptionClick(opt.nextId, opt.label, opt.isExternalLink)}
                                className="w-full text-left rounded-lg border border-cappiblue p-2 text-sm text-cappiblue bg-cappiyellow/20 font-medium transition hover:bg-cappiyellow/60"
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