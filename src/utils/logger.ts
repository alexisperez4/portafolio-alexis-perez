import winston from 'winston';

// to ignore info logs and only show errors in test environment
const isTestEnvironment = process.env.NODE_ENV === 'test';

const transports: winston.transport[] = [
    new winston.transports.File({ 
      filename: "./logs/app.log",
    }),
];
  
if (!isTestEnvironment) {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.prettyPrint(),
        ),
      }),
    );
}

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf((info) => `${info.timestamp} ${info.level} : [${info.stack}]`)
    ),
    transports,
});
