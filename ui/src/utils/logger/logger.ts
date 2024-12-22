import winston from "winston";
import rpReporter from "wdio-reportportal-reporter";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { LEVEL } = require("wdio-reportportal-reporter/build/constants");

const winstonLogger = winston.createLogger({
    level: "info",
    format: winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
            ),
        }),
    ],
});

class Logger {
    info(msg: string) {
        winstonLogger.info(msg);
        rpReporter.sendLog(LEVEL.INFO, msg);
    }

    debug(msg) {
        winstonLogger.debug(msg);
        rpReporter.sendLog(LEVEL.DEBUG, msg);
    }

    error(msg) {
        winstonLogger.error(msg);
        rpReporter.sendLog(LEVEL.ERROR, msg);
    }
}

export const logger = new Logger();
