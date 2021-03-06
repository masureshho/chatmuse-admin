import * as winston from 'winston';
import { default as config } from 'config';
import * as expressWinston from 'express-winston';
import { logger } from '../common/logger';
const level = config.get('loglevel');

function setupExpress(app) {
  // error logging
  if (level === 'debug') {
    app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));
  }

  // request logging
  if (level === 'info') {
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));
  }
}

export default function setupLogging(app) {
  // Development Logger
  // const env = config.util.getEnv('NODE_ENV');

  if (level === 'info') {
    logger.add(winston.transports.Console, {
      type: 'verbose',
      colorize: true,
      prettyPrint: true,
      handleExceptions: true,
      humanReadableUnhandledException: true
    });
  }
  setupExpress(app);
}