import express from 'express';
import { CompressionTypes } from 'kafkajs';
import ProducerService from './KafkaService/producer';

const routes = express.Router();

routes.post('/certifications', async (req, res) => {

  const message = req.body;
  const producer = req.producer;
  const topic = 'issue-certificate';

  const producerService = new ProducerService();

  // Enviando a mensagem, topic e o producer para o Service
  producerService.sendMessage(message, producer, topic);

  return res.json({ ok: true });
});

export default routes;