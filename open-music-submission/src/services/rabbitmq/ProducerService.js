const amqp = require('amqplib');
const { config } = require('../../commons/config');

const ProducerService = {
  sendMessage: async (queue, message) => {
    const connection = amqp.connect(config.rabbitMq.url);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, {
      durable: true,
    });

    await channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

module.exports = ProducerService;