require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const sentimentos = [];

app.post('/sentimentos', async (req, res) => {
  try {
    const prompt = `Qual o sentimento deste texto usando apenas uma palavra (Positivo, Negativo ou Neutro): ${req.body.texto}`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0,
    });
    const sentimento = response.data.choices[0].text.trim();
    sentimentos.push(sentimento);
    res.json({ sentimento, sentimentos });
  } catch (error) {
    console.log('ERRO', error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação.' });
  }
});

const porta = process.env.PORT || 19006;

app.listen(porta, () => console.log(`Servidor on. Porta: ${porta}`));
