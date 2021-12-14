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

    let counter = 0;
    setInterval(() => {
      channel.publish(EXCHANGE, '', Buffer.from('Counter: ' + counter++));
      console.log('Sent to exchange %s counter %d.', EXCHANGE, counter);
    }, 500);
  });
});