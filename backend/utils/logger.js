const winston = require('winston');
const { combine, timestamp, printf, colorize, json } = winston.format;

// Format personnalisé pour la console
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Configuration des transports
const transports = [
  new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      consoleFormat
    )
  }),
  new winston.transports.File({ 
    filename: 'logs/error.log', 
    level: 'error',
    format: combine(timestamp(), json())
  }),
  new winston.transports.File({ 
    filename: 'logs/combined.log',
    format: combine(timestamp(), json())
  })
];

// Création du logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transports,
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ]
});

// Stream pour morgan
logger.stream = {
  write: (message) => logger.info(message.trim())
};

module.exports = logger;