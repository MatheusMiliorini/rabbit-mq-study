const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    const EXCHANGE = 'EXCHANGE_1';

    channel.assertExchange(EXCHANGE, 'fanout', { durable: false });

    channel.assertQueue('', { exclusive: true }, function (error2, q) {
      if (error2) {
        throw error2;
      }

      console.log('Waiting for messages in %s.', q.queue);

      channel.bindQueue(q.queue, EXCHANGE, '');

      channel.consume(q.queue, function (msg) {
        if (msg.content) {
          console.log('Message received: %s', msg.content.toString());
        }
      }, { noAck: true });
    });

  });
});