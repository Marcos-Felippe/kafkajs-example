import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/certifications', async (req, res) => {
  const message = {
    user: { id: 1, name: 'Marcos Felippe' },
    course: 'Kafka e Node.js',
    grade: 10,
  };

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