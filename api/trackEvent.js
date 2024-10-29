import sendEvent from '../sendEvent';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Información del evento, proveniente del frontend o directamente del servidor
        const eventData = {
            emailHash: req.body.emailHash, // Hash SHA256 del correo electrónico
            customData: {
                currency: 'USD', // Cambia según sea necesario
                value: req.body.value || 100.0 // Valor de ejemplo
            }
        };

        // Llamar a la función sendEvent con el nombre del evento
        const result = await sendEvent('Purchase', eventData);

        res.status(200).json(result); // Responder con el resultado
    } else {
        res.status(405).json({ message: 'Método no permitido' }); // Solo aceptar POST
    }
}
