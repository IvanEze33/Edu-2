
const fetch = require('node-fetch');

// Variables de entorno para el ID del Pixel y el Token de Acceso, configuradas en Vercel y GitHub
const FACEBOOK_PIXEL_ID = process.env.FACEBOOK_PIXEL_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

async function sendEvent(eventName, eventData) {

    const url = `https://graph.facebook.com/v14.0/${FACEBOOK_PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    

    const payload = {
        data: [
            {
                event_name: eventName, // Nombre del evento
                event_time: Math.floor(new Date() / 1000), // Hora en segundos Unix
                user_data: {
                    em: eventData.emailHash, // El correo debe estar en SHA256 antes de enviarse
                },
                custom_data: eventData.customData, // Datos personalizados
                action_source: "website" // Fuente del evento
            }
        ]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });


    const responseBody = await response.json();
    return responseBody;
}

module.exports = sendEvent;
