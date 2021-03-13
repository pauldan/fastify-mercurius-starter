'use strict';
const fastify = require('fastify');
const pinoPretty = require('pino-pretty');

const server = fastify({
  logger: {
    prettyPrint: true,
    pretiffier: pinoPretty,
    level: 'debug',
  },
})
  .register(require('./config'))
  .register(require('./plugins/session'))
  .register(require('./plugins/mercurius'))
  .register(require('./plugins/altair'));

// async start
const start = async () => {
  try {
    await server.ready();
    await server.listen(4000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
