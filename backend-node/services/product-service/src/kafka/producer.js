import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'restaurant-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
};

export const sendLog = async (service, message) => {
  await producer.send({
    topic: 'logs',
    messages: [
      {
        value: JSON.stringify({
          service,
          message,
          timestamp: new Date()
        })
      }
    ]
  });
};