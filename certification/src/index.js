import { Kafka } from 'kafkajs';
import ProducerService from './KafkaService/producer';

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'certificate',
});

const consumer = kafka.consumer({ groupId: 'certificate-group' });

const producer = kafka.producer();

async function run() {
  
  await consumer.connect();
  await consumer.subscribe({ topic: 'issue-certificate' });

  await producer.connect();

  await consumer.run({

    eachMessage: async ({ topic, partition, message }) => {
      
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key} # ${message.value}`);

      const payload = JSON.parse(message.value);

      const topicProducer = 'certification-response';
      const messageProducer = `Certificado do usuário ${payload.user.name} do curso ${payload.course} gerado!`;

      const producerService = new ProducerService();

      producerService.sendMessage(messageProducer, producer, topicProducer);
    },

  });
}

run().catch(console.error);