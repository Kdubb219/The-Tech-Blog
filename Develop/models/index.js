const { Sequelize } = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = new Sequelize('techblog_db','root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import the models
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

// Create the session store
const sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions (15 minutes)
  expiration: 24 * 60 * 60 * 1000 // The maximum age (in milliseconds) of a valid session (1 day)
});

// Synchronize the session store with the database
sessionStore.sync();

// Export the models and session store
db.sessionStore = sessionStore;



module.exports = db;