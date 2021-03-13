require('dotenv').config();
const fp = require('fastify-plugin');

module.exports = fp(
  (app, _, done) => {
    const config = {
      __PROD__: process.env.NODE_ENV === 'production',
      SESSION_SECRET: process.env.SESSION_SECRET || 'set a secret in .env',
      ALTAIR_URL: process.env.ALTAIR_URL || '/altair',
      GRAPHQL_URL: process.env.GRAPHQL_URL || '/graphql',
    };
    app.decorate('config', config);
    done();
  },
  { name: 'config' }
);
