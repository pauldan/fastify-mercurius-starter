const bcryptjs = require('bcryptjs');

const resolvers = {
  Query: {
    add: (_, { x, y }) => {
      return x + y;
    },
    login: (_, { username, password }, { session, db }) => {
      const identifierType = username.includes('@') ? 'email' : 'username';
      const user = db.users.find(u => u[identifierType] === username);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      if (!bcryptjs.compareSync(password, user.password)) {
        throw new Error('Invalid credentials');
      }

      session.set('userId', user.id);
      return user;
    },
    me: (parent, args, { db, session }) => {
      const userId = session && session.get('userId');

      if (userId) {
        return db.users.find(u => u.id === userId);
      }

      return null;
    },
    logout: (_, __, { session }) => {
      session.destroy();
      return true;
    },
  },
};

module.exports = resolvers;
