import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/certifications', async (req, res) => {
  const message = req.body;

  // Chamar micro serviço
  await req.producer.send({
    topic: 'issue-certificate',
    messages: [
      { value: JSON.stringify(message) },
    ],
  })

  return res.json({ ok: true });
});

export default routes;