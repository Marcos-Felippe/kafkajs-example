// Service que envia as mensagens para o kafka

class ProducerService {
    async sendMessage(message, producer, topic){
        await producer.send({
            topic: topic,
            messages: [
              { value: message },
            ],
        })
    }
}

export default ProducerService;