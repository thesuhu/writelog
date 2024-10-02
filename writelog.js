/**
 * MIT License
 * https://github.com/thesuhu/writelog/blob/master/LICENSE
 */

const winston = require('winston');
require('winston-daily-rotate-file');
const basedir = require('app-root-path');
const maxsize = process.env.MAXSIZE || '5m';
const maxfiles = process.env.MAXFILES || '30d';
const env = process.env.ENV || 'dev';

const logFormat = winston.format.combine(
    winston.format.errors({ stack: true }), // Menambahkan stack trace jika terjadi error
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Menggunakan format timestamp bawaan Winston
    winston.format.printf(info => {
        // const stackTrace = info.stack ? `\nObject: ${info.stack}` : '';
        let stackTrace = '';
        if (info.stack) {
            // Regular expression to match the file path inside parentheses
            const regex = /\(([^)]+)\)/;
            const match = info.stack.match(regex);
            if (match) {
                const filePath = match[1];
                stackTrace = `\nObject: ${filePath}`;
                // console.log(filePath); // Output: G:\Repository\GitHub\writelog\test\test.js:24:9
            }
        }
        // Menampilkan informasi request jika ada
        const requestInfo = info.request ? `\nRequest: ${info.request.method} ${info.request.originalUrl}` : '';
        return `${info.timestamp} ${info.level}: ${info.message}${requestInfo}${stackTrace}`;
    }));

// Fungsi untuk membuat transport file
const createFileTransport = (logDir) => {
    return new winston.transports.DailyRotateFile({
        filename: logDir + '/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: maxsize,
        maxFiles: maxfiles,
        format: logFormat
    });
}

const logger = winston.createLogger({ format: logFormat });

// Log to file (default directory)
logger.add(createFileTransport(basedir + '/logs'));

if (env == 'dev' || env == 'development') {
    // Log to the console
    logger.add(new (winston.transports.Console)({
        colorize: true,
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Menggunakan format timestamp bawaan Winston
            winston.format.printf(info => {
                // const stackTrace = info.stack ? `\nObject: ${info.stack}` : '';
                let stackTrace = '';
                if (info.stack) {
                    // Regular expression to match the file path inside parentheses
                    const regex = /\(([^)]+)\)/;
                    const match = info.stack.match(regex);
                    if (match) {
                        const filePath = match[1];
                        stackTrace = `\n\x1b[32mObject:\x1b[0m \x1b[90m${filePath}\x1b[0m`;
                        // console.log(filePath); // Output: G:\Repository\GitHub\writelog\test\test.js:24:9
                    }
                }
                // Menampilkan informasi request jika ada
                const requestInfo = info.request ? `\n\x1b[32mRequest:\x1b[0m \x1b[90m${info.request.method} ${info.request.originalUrl}\x1b[0m` : '';
                return `\x1b[36m${info.timestamp}\x1b[0m ${info.level}: ${info.message}${requestInfo}${stackTrace}`;
            }))
    }));
}

// Fungsi untuk mengubah lokasi log
logger.changeLogLocation = (newLogDir) => {
    // Dapatkan semua transport yang ada
    const transports = logger.transports;
    // Hapus semua transport bertipe DailyRotateFile
    transports.forEach(transport => {
        if (transport instanceof winston.transports.DailyRotateFile) {
            logger.remove(transport);
        }
    });
    // Tambahkan transport file yang baru dengan lokasi yang baru
    logger.add(createFileTransport(newLogDir));
}

module.exports = logger;