const AltairFastify = require('altair-fastify-plugin');

module.exports = (app, _, done) => {
  const { ALTAIR_URL, GRAPHQL_URL, __PROD__ } = app.config;
  // dont register altair in production
  if (!__PROD__) {
    app.register(AltairFastify, {
      path: ALTAIR_URL,
      baseURL: ALTAIR_URL,
      endpointURL: GRAPHQL_URL,
    });
  }
  done();
};
