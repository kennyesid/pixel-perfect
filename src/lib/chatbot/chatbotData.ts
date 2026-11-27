
export type ChatNode = {
    id: string;
    message: string;
    options: {
        label: string;
        nextId: string | null;
        isExternalLink?: string;
    }[];
};

export const chatbotData: Record<string, ChatNode> = {
    // ==========================================
    // MENÚ PRINCIPAL
    // ==========================================
    root: {
        id: "root",
        message:
            "¡Hola! Soy CapyBot 🧇, tu asistente virtual. Estoy aquí para ayudarte a disfrutar de nuestros deliciosos waffles, helados y bebidas. ¿Qué te gustaría saber?",
        options: [
            { label: "📦 Consultas de pedidos", nextId: "pedidos" },
            { label: "🧇 Información de productos", nextId: "productos" },
            { label: "👨‍🍳 Preparación y elaboración", nextId: "produccion" },
            { label: "🚚 Delivery y envíos", nextId: "delivery" },
            { label: "💳 Pagos y promociones", nextId: "pagos" },
            { label: "🙋 Hablar con una persona", nextId: "humano" },
        ],
    },

    // ==========================================
    // PEDIDOS
    // ==========================================
    pedidos: {
        id: "pedidos",
        message: "¡Claro! 📦 ¿Qué necesitas saber sobre tu pedido?",
        options: [
            { label: "¿Dónde está mi pedido?", nextId: "rastreo" },
            { label: "¿Puedo cancelar mi pedido?", nextId: "cancelar" },
            { label: "¿Puedo modificar mi pedido?", nextId: "modificar" },
            { label: "¿Cómo puedo realizar un pedido?", nextId: "realizar_pedido" },
            { label: "¿Puedo realizar un pedido personalizado?", nextId: "personalizado" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },

    rastreo: {
        id: "rastreo",
        message:
            "¡Queremos que disfrutes tu pedido lo antes posible! 🛵 Si ya realizaste tu compra, puedes consultar su estado desde la plataforma. Si necesitas más información, nuestro equipo estará encantado de ayudarte.",
        options: [
            { label: "Ver mis pedidos", nextId: null, isExternalLink: "/mis-pedidos" },
            { label: "Hablar con una persona", nextId: "humano" },
            { label: "Volver al menú", nextId: "root" },
        ],
    },

    cancelar: {
        id: "cancelar",
        message:
            "¡Entendemos! 😊 Si necesitas cancelar tu pedido, comunícate con nuestro equipo lo antes posible. Una vez que la preparación haya comenzado, es posible que no podamos realizar la cancelación.",
        options: [
            { label: "Hablar con una persona", nextId: "humano" },
            { label: "Volver al menú", nextId: "root" },
        ],
    },

    modificar: {
        id: "modificar",
        message:
            "¡Claro que sí! 🧇 Si deseas cambiar algún producto, ingrediente o cantidad, comunícate con nosotros lo antes posible. Los cambios dependerán del estado de preparación de tu pedido.",
        options: [
            { label: "Hablar con una persona", nextId: "humano" },
            { label: "Volver al menú", nextId: "root" },
        ],
    },

    realizar_pedido: {
        id: "realizar_pedido",
        message:
            "¡Es muy fácil! 😋 Ingresa a nuestro menú, selecciona tus productos favoritos, agrégalos al carrito y sigue los pasos para confirmar tu pedido. ¡Nosotros nos encargamos del resto!",
        options: [
            { label: "Ver nuestro menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver al menú", nextId: "root" },
        ],
    },

    personalizado: {
        id: "personalizado",
        message:
            "¡Nos encanta que tengas tus propias combinaciones! ❤️ Puedes consultar las opciones de ingredientes y adicionales disponibles en cada producto. Si necesitas algo especial, contáctanos para verificar si podemos prepararlo.",
        options: [
            { label: "Ver productos", nextId: null, isExternalLink: "/menu" },
            { label: "Hablar con una persona", nextId: "humano" },
            { label: "Volver al menú", nextId: "root" },
        ],
    },

    // ==========================================
    // PRODUCTOS
    // ==========================================
    productos: {
        id: "productos",
        message:
            "¡Tenemos opciones deliciosas para todos los gustos! 😍 ¿Sobre qué producto quieres consultar?",
        options: [
            { label: "Waffles 🧇", nextId: "waffles" },
            { label: "Helados 🍦", nextId: "helados" },
            { label: "Frappés 🥤", nextId: "frappes" },
            { label: "Ingredientes y alérgenos", nextId: "alergenos" },
            { label: "Tamaños y porciones", nextId: "porciones" },
            { label: "Ver todo el menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },

    waffles: {
        id: "waffles",
        message:
            "¡Nuestros waffles son una delicia! 🧇 Los preparamos al momento para conseguir una textura doradita por fuera y suave por dentro. Puedes elegir entre nuestras diferentes combinaciones y acompañamientos.",
        options: [
            { label: "¿Cuánto tarda su preparación?", nextId: "tiempo_waffle" },
            { label: "¿Puedo elegir los toppings?", nextId: "toppings" },
            { label: "¿Puedo agregar ingredientes extra?", nextId: "adicionales" },
            { label: "Ver waffles disponibles", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a productos", nextId: "productos" },
        ],
    },

    helados: {
        id: "helados",
        message:
            "¡Tenemos deliciosas opciones de helados! 🍦 Son perfectos para disfrutar solos o acompañados de tus waffles favoritos. Consulta los sabores y presentaciones disponibles en nuestro menú.",
        options: [
            { label: "¿Qué sabores tienen?", nextId: "sabores_helado" },
            { label: "¿Puedo combinar varios sabores?", nextId: "combinar_helados" },
            { label: "Ver helados disponibles", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a productos", nextId: "productos" },
        ],
    },

    sabores_helado: {
        id: "sabores_helado",
        message:
            "¡Tenemos diferentes sabores para elegir! 🍨 La disponibilidad puede variar según el día. Te invitamos a revisar nuestro menú actualizado para conocer las opciones disponibles.",
        options: [
            { label: "Ver menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a productos", nextId: "productos" },
        ],
    },

    combinar_helados: {
        id: "combinar_helados",
        message:
            "¡Claro! 😍 Las combinaciones dependerán de la presentación y las opciones disponibles. Revisa las alternativas al seleccionar tu helado en el menú.",
        options: [
            { label: "Ver menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a productos", nextId: "productos" },
        ],
    },

    frappes: {
        id: "frappes",
        message:
            "¡Nuestros frappés son ideales para refrescarte! 🥤 Son bebidas frías y cremosas, perfectas para acompañar tus postres. Revisa nuestro menú para descubrir los sabores disponibles.",
        options: [
            { label: "¿Qué sabores tienen?", nextId: "sabores_frappe" },
            { label: "¿Se pueden personalizar?", nextId: "personalizar_frappe" },
            { label: "Ver frappés disponibles", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a productos", nextId: "productos" },
        ],
    },

    sabores_frappe: {
        id: "sabores_frappe",
        message:
            "¡Hay sabores deliciosos esperándote! 🥤 Puedes consultar las variedades disponibles y sus ingredientes directamente en nuestro menú.",
        options: [
            { label: "Ver menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a productos", nextId: "productos" },
        ],
    },

    personalizar_frappe: {
        id: "personalizar_frappe",
        message:
            "¡Nos encanta la creatividad! 🥤 Algunas bebidas permiten agregar ingredientes o adicionales. Consulta las opciones disponibles al seleccionar tu frappé.",
        options: [
            { label: "Ver menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a productos", nextId: "productos" },
        ],
    },

    toppings: {
        id: "toppings",
        message:
            "¡Por supuesto! 😋 Puedes elegir entre los toppings y acompañamientos que estén habilitados para cada waffle. ¡Combina tus favoritos y crea una experiencia deliciosa!",
        options: [
            { label: "Ver waffles", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a waffles", nextId: "waffles" },
        ],
    },

    adicionales: {
        id: "adicionales",
        message:
            "¡Sí! ❤️ Dependiendo del producto, podrás agregar ingredientes adicionales. Los precios de cada extra se muestran en el menú al momento de personalizar tu pedido.",
        options: [
            { label: "Ver menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a waffles", nextId: "waffles" },
        ],
    },

    porciones: {
        id: "porciones",
        message:
            "¡Tenemos diferentes presentaciones! 🧇 El tamaño, los ingredientes y el precio de cada producto están detallados en nuestro menú para que puedas elegir el que más te guste.",
        options: [
            { label: "Consultar menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a productos", nextId: "productos" },
        ],
    },

    alergenos: {
        id: "alergenos",
        message:
            "¡Tu seguridad es importante para nosotros! ❤️ Algunos productos pueden contener ingredientes como leche, huevo, trigo, gluten o frutos secos. También puede existir contaminación cruzada durante la preparación. Si tienes alguna alergia, consulta con nuestro equipo antes de realizar tu pedido.",
        options: [
            { label: "Consultar ingredientes", nextId: null, isExternalLink: "/menu" },
            { label: "Hablar con una persona", nextId: "humano" },
            { label: "Volver a productos", nextId: "productos" },
        ],
    },

    // ==========================================
    // PREPARACIÓN
    // ==========================================
    produccion: {
        id: "produccion",
        message:
            "¡Nos gusta preparar cada producto con mucho cariño! 👨‍🍳 ¿Qué te gustaría conocer sobre nuestra preparación?",
        options: [
            { label: "¿Cuánto tarda un waffle?", nextId: "tiempo_waffle" },
            { label: "¿Preparan todo al momento?", nextId: "preparacion_momento" },
            { label: "¿Cuánto tarda un helado?", nextId: "tiempo_helado" },
            { label: "¿Cuánto tarda un frappé?", nextId: "tiempo_frappe" },
            { label: "¿Puedo solicitar cambios?", nextId: "modificaciones" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },

    tiempo_waffle: {
        id: "tiempo_waffle",
        message:
            "🧇 ¡La espera vale la pena! Nuestros waffles tienen un tiempo aproximado de preparación de 5 minutos. Los elaboramos al momento para que los disfrutes calientitos, doraditos y deliciosos. ❤️ Ten en cuenta que en horarios de alta demanda el tiempo puede ser un poquito mayor.",
        options: [
            { label: "Ver waffles", nextId: null, isExternalLink: "/menu" },
            { label: "Consultar otros productos", nextId: "produccion" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },

    preparacion_momento: {
        id: "preparacion_momento",
        message:
            "¡Así es! 😍 Preparamos nuestros productos al momento de recibir tu pedido, buscando ofrecerte la mejor frescura, sabor y calidad en cada preparación.",
        options: [
            { label: "Consultar tiempos", nextId: "produccion" },
            { label: "Ver menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },

    tiempo_helado: {
        id: "tiempo_helado",
        message:
            "🍦 ¡Los helados están listos para endulzar tu día! Su preparación y servido normalmente toman entre 2 y 5 minutos, dependiendo de la presentación y los acompañamientos.",
        options: [
            { label: "Ver helados", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a preparación", nextId: "produccion" },
        ],
    },

    tiempo_frappe: {
        id: "tiempo_frappe",
        message:
            "🥤 Nuestros frappés se preparan al momento. El tiempo estimado es de 3 a 5 minutos, dependiendo del sabor y los ingredientes adicionales.",
        options: [
            { label: "Ver frappés", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a preparación", nextId: "produccion" },
        ],
    },

    modificaciones: {
        id: "modificaciones",
        message:
            "¡Claro! 😊 Puedes consultar las opciones de personalización disponibles para cada producto. Si tienes una solicitud especial, nuestro equipo puede ayudarte a verificar si es posible realizarla.",
        options: [
            { label: "Ver menú", nextId: null, isExternalLink: "/menu" },
            { label: "Hablar con una persona", nextId: "humano" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },

    // ==========================================
    // DELIVERY
    // ==========================================
    delivery: {
        id: "delivery",
        message:
            "¡Llevamos la felicidad hasta donde estés! 🛵 ¿Qué necesitas saber sobre nuestros envíos?",
        options: [
            { label: "¿Realizan entregas a domicilio?", nextId: "delivery_disponible" },
            { label: "¿Cuánto tarda el delivery?", nextId: "tiempo_delivery" },
            { label: "¿Cuál es el costo del envío?", nextId: "costo_delivery" },
            { label: "¿A qué zonas llegan?", nextId: "zonas_delivery" },
            { label: "¿Puedo recoger mi pedido?", nextId: "recoger" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },

    delivery_disponible: {
        id: "delivery_disponible",
        message:
            "¡Sí! Puedes consultar la disponibilidad del servicio de delivery al momento de realizar tu pedido. La cobertura dependerá de tu ubicación.",
        options: [
            { label: "Realizar un pedido", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a delivery", nextId: "delivery" },
        ],
    },

    tiempo_delivery: {
        id: "tiempo_delivery",
        message:
            "🛵 El tiempo de entrega depende de la distancia, el tráfico y la cantidad de pedidos que tengamos en preparación. Una vez confirmado tu pedido, podrás consultar su estado desde nuestra plataforma.",
        options: [
            { label: "Consultar mi pedido", nextId: "rastreo" },
            { label: "Volver a delivery", nextId: "delivery" },
        ],
    },

    costo_delivery: {
        id: "costo_delivery",
        message:
            "El costo del delivery puede variar según la distancia de entrega. 🚚 Podrás consultar el importe correspondiente antes de confirmar tu pedido.",
        options: [
            { label: "Realizar un pedido", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a delivery", nextId: "delivery" },
        ],
    },

    zonas_delivery: {
        id: "zonas_delivery",
        message:
            "📍 La cobertura de nuestras entregas depende de la ubicación. Ingresa tu dirección al realizar tu pedido para comprobar si llegamos hasta tu zona.",
        options: [
            { label: "Consultar cobertura", nextId: "humano" },
            { label: "Volver a delivery", nextId: "delivery" },
        ],
    },

    recoger: {
        id: "recoger",
        message:
            "¡Por supuesto! 😊 Si tienes disponible la opción de recojo en el establecimiento, podrás seleccionarla al realizar tu pedido.",
        options: [
            { label: "Ver menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a delivery", nextId: "delivery" },
        ],
    },

    // ==========================================
    // PAGOS Y PROMOCIONES
    // ==========================================
    pagos: {
        id: "pagos",
        message:
            "¡Vamos con las consultas de pago! 💳 ¿Qué necesitas saber?",
        options: [
            { label: "¿Qué métodos de pago aceptan?", nextId: "metodos_pago" },
            { label: "¿Dónde puedo ver los precios?", nextId: "precios" },
            { label: "¿Tienen promociones?", nextId: "promociones" },
            { label: "¿Realizan descuentos?", nextId: "descuentos" },
            { label: "¿Puedo solicitar factura?", nextId: "factura" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },

    metodos_pago: {
        id: "metodos_pago",
        message:
            "💳 Los métodos de pago habilitados se mostrarán durante el proceso de compra, antes de confirmar tu pedido. Si tienes alguna duda sobre un método específico, nuestro equipo puede orientarte.",
        options: [
            { label: "Realizar un pedido", nextId: null, isExternalLink: "/menu" },
            { label: "Hablar con una persona", nextId: "humano" },
            { label: "Volver a pagos", nextId: "pagos" },
        ],
    },

    precios: {
        id: "precios",
        message:
            "¡Queremos que conozcas todas nuestras delicias! 😋 Los precios actualizados de nuestros waffles, helados y bebidas están disponibles directamente en el menú.",
        options: [
            { label: "Consultar precios", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a pagos", nextId: "pagos" },
        ],
    },

    promociones: {
        id: "promociones",
        message:
            "🎉 ¡Siempre es buen momento para disfrutar algo delicioso! Consulta nuestra sección de promociones y mantente atento a nuestras publicaciones para conocer las ofertas disponibles.",
        options: [
            { label: "Ver menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver a pagos", nextId: "pagos" },
        ],
    },

    descuentos: {
        id: "descuentos",
        message:
            "❤️ Nuestras promociones y descuentos pueden variar según la temporada y las campañas vigentes. Te invitamos a consultar las ofertas disponibles en nuestra plataforma.",
        options: [
            { label: "Ver promociones", nextId: "promociones" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },

    factura: {
        id: "factura",
        message:
            "¡Claro! Si necesitas factura, consulta con nuestro equipo antes de finalizar tu compra para verificar los datos y las condiciones de emisión.",
        options: [
            { label: "Hablar con una persona", nextId: "humano" },
            { label: "Volver a pagos", nextId: "pagos" },
        ],
    },

    // ==========================================
    // ATENCIÓN PERSONALIZADA
    // ==========================================
    humano: {
        id: "humano",
        message:
            "¡Por supuesto! ❤️ Nos encantaría ayudarte personalmente. Nuestro equipo de atención estará encantado de resolver tus dudas. Escríbenos a través de nuestros canales oficiales de contacto. ¡Estamos para servirte!",
        options: [
            { label: "Ver menú", nextId: null, isExternalLink: "/menu" },
            { label: "Volver al inicio", nextId: "root" },
        ],
    },

    // ==========================================
    // RESPUESTA POR DEFECTO
    // ==========================================
    fallback: {
        id: "fallback",
        message:
            "¡Ups! 😅 Parece que todavía no tengo una respuesta para esa consulta. ¡Pero no te preocupes! Estamos trabajando para ampliar mi conocimiento y muy pronto tendrás nuevas respuestas y funcionalidades disponibles. 🧇❤️\n\nMientras tanto, puedes explorar nuestro menú o comunicarte con nuestro equipo. ¡Gracias por tu paciencia!",
        options: [
            { label: "Consultar preguntas frecuentes", nextId: "root" },
            { label: "Ver nuestro menú", nextId: null, isExternalLink: "/menu" },
            { label: "Hablar con una persona", nextId: "humano" },
        ],
    },
};


// export type ChatNode = {
//     id: string;
//     message: string;
//     options: { label: string; nextId: string | null; isExternalLink?: string }[];
// };

// export const chatbotData: Record<string, ChatNode> = {
//     root: {
//         id: "root",
//         message: "¡Hola! Soy CapyBot 🧇. ¿En qué te puedo ayudar hoy?",
//         options: [
//             { label: "Consultas de pedidos", nextId: "pedidos" },
//             { label: "Dudas de productos", nextId: "productos" },
//             { label: "¿Cómo los producimos?", nextId: "produccion" },
//             { label: "Hablar con una persona", nextId: "humano" },
//         ],
//     },
//     pedidos: {
//         id: "pedidos",
//         message: "Entiendo. ¿Qué necesitas saber sobre tu pedido?",
//         options: [
//             { label: "¿Dónde está mi pedido?", nextId: "rastreo" },
//             { label: "Políticas de envío", nextId: "envios" },
//             { label: "Volver al inicio", nextId: "root" },
//         ],
//     },
//     productos: {
//         id: "productos",
//         message: "¿Qué te gustaría saber de nuestros waffles?",
//         options: [
//             { label: "Tiempo de cocción", nextId: "coccion" },
//             { label: "Alérgenos e ingredientes", nextId: "alergenos" },
//             { label: "Volver al inicio", nextId: "root" },
//         ],
//     },
//     coccion: {
//         id: "coccion",
//         message: "Nuestros waffles se preparan al momento. Tardamos entre 10 y 15 minutos para garantizar que te lleguen crujientes y calientitos. 🧇🔥",
//         options: [
//             { label: "Hacer otra pregunta", nextId: "root" },
//             { label: "Ver el menú", nextId: null, isExternalLink: "/menu" }, // Ejemplo de link
//         ],
//     },
// };