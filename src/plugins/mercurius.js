const fp = require('fastify-plugin');
const mercurius = require('mercurius');

const db = {
  users: [
    {
      id: 1,
      email: 'user@email.com',
      name: 'User',
      username: 'user',
      password: '$2a$10$qt2QJMDfIrV./a9sJ6pb8uFcDQsqB2xfBIvna/Qu664/Yl4W9tHXK',
    },
  ],
};

const { schema } = require('../graphql');

module.exports = fp(
  (app, _, done) => {
    app.register(mercurius, {
      schema,
      graphiql: false,
      ide: false,
      jit: 1,
      path: app.config.GRAPHQL_URL,
      context: (request, reply) => {
        return {
          session: request.session,
          db,
        };
      },
    });
    done();
  },
  {
    name: 'mercurius',
    dependencies: ['config'],
  }
);
