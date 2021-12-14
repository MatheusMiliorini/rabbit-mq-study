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

    let counter = 0;
    setInterval(() => {
      channel.sendToQueue(QUEUE, Buffer.from('Counter: ' + counter++), { persistent: true });
      console.log('Sent to queue %s counter %d.', QUEUE, counter);
    }, 500);
  });
});