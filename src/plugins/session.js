'use strict';
const cookie = require('fastify-cookie');
const session = require('@mgcrea/fastify-session');
const fp = require('fastify-plugin');

module.exports = fp(
  async (app, _, done) => {
    const { SESSION_SECRET, __PROD__ } = app.config;
    app.register(cookie);
    app.register(session, {
      secret: SESSION_SECRET,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: __PROD__,
      },
    });
    done();
  },
  { name: 'session', dependencies: ['config'] },
);
