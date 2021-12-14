const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    const QUEUE = 'QUEUE_1';

    channel.assertQueue(QUEUE, { durable: true });

    console.log('Waiting for messages.');

    channel.consume(QUEUE, function (msg) {
      console.log('Message received: %s', msg.content.toString());
      channel.ack(msg);
    });
  });
});