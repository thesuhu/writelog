/**
  * MIT License
  * https://github.com/thesuhu/writelog/blob/master/LICENSE
*/

const winston = require('winston')
require('winston-daily-rotate-file')
const basedir = require('app-root-path')
const maxsize = process.env.MAXSIZE || '5m'
const maxfiles = process.env.MAXFILES || '30d'
const env = process.env.ENV || 'dev'

// local timezone
var tz = getCurrentTime()

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
        info => `${tz} ${info.level}: ${info.message}`,
    ));

// transport option
var options = {
    file: {
        filename: basedir + '/logs/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: maxsize,
        maxFiles: maxfiles,
        format: logFormat
    }
}

const logger = winston.createLogger({format: logFormat})

// Log to file
logger.add(new (winston.transports.DailyRotateFile)(options.file))

if (env == 'dev') {
    // Log to the console
    logger.add(new (winston.transports.Console)({
        colorize: true,
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(
                info => `${tz} ${info.level}: ${info.message}`,
            )
        )
    }))
}

module.exports = logger

// generate local time
function getCurrentTime() {
    var currentdate = new Date()
    var datetime = currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours().toString().padStart(2, "0") + ":" +
        currentdate.getMinutes().toString().padStart(2, "0") + ":" +
        currentdate.getSeconds().toString().padStart(2, "0")
    return datetime
}