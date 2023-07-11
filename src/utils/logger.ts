import winston from 'winston';

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf((info) => `${info.timestamp} ${info.level} : [${info.stack}]`)
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.prettyPrint(),

            )
        }),
        new winston.transports.File({ 
            filename: "./logs/app.log",
        }),
    ],
});

