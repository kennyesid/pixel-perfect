export type ChatNode = {
    id: string;
    message: string;
    options: { label: string; nextId: string | null; isExternalLink?: string }[];
};

export const chatbotData: Record<string, ChatNode> = {
    root: {
        id: "root",
        message: "¡Hola! Soy CapyBot 🧇. ¿En qué te puedo ayudar hoy?",
        options: [
            { label: "Consultas de pedidos", nextId: "pedidos" },
            { label: "Dudas de productos", nextId: "productos" },
            { label: "¿Cómo los producimos?", nextId: "produccion" },
            { label: "Hablar con una persona", nextId: "humano" },
        ],
    },
    pedidos: {
        id: "pedidos",
        message: "Entiendo. ¿Qué necesitas saber sobre tu pedido?",
        options: [
            { label: "¿Dónde está mi pedido?", nextId: "rastreo" },
            { label: "Políticas de envío", nextId: "envios" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },
    productos: {
        id: "productos",
        message: "¿Qué te gustaría saber de nuestros waffles?",
        options: [
            { label: "Tiempo de cocción", nextId: "coccion" },
            { label: "Alérgenos e ingredientes", nextId: "alergenos" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },
    coccion: {
        id: "coccion",
        message: "Nuestros waffles se preparan al momento. Tardamos entre 10 y 15 minutos para garantizar que te lleguen crujientes y calientitos. 🧇🔥",
        options: [
            { label: "Hacer otra pregunta", nextId: "root" },
            { label: "Ver el menú", nextId: null, isExternalLink: "/menu" }, // Ejemplo de link
        ],
    },
    // ... (puedes agregar el resto de nodos)
};