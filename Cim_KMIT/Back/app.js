const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors');

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

const app = express();
const port = 3000;

// Configuración para obtener la API KEY de OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar las solicitudes de conversación
app.post('/api/conversation', async (req, res) => {
  const { messages } = req.body;

  try {
    // Enviar la solicitud a la API de OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    // Devolver la respuesta al cliente
    res.send({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
