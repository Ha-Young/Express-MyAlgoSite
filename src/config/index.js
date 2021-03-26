const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

// if (envFound.error) {
//   // This error should crash whole process
//   throw new Error("⚠️  Couldn't find .env file  ⚠️");
// }

module.exports = {
  port: normalizePort(process.env.PORT || '3000'),

  databaseURL: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  api: {
    prefix: '/api',
  },
};

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
