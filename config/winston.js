const fs = require("fs");
const path = require("path");
const winston = require("winston");

const logDirectoryPath = path.join(__dirname, "/../logs");

if (!fs.existsSync(logDirectoryPath)) {
  fs.mkdirSync(logDirectoryPath);
}

const infoTransport = new winston.transports.File({
  filename: "info.log",
  dirname: logDirectoryPath,
  level: "info",
});

const errorTransport = new winston.transports.File({
  filename: "error.log",
  dirname: logDirectoryPath,
  level: "error",
});

const logger = winston.createLogger({
  transports: [infoTransport, errorTransport],
});

const stream = {
  write: message => {
    logger.info(message);
  },
};

module.exports =  { logger, stream };