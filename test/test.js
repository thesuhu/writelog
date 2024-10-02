/**
  * MIT License
  * https://github.com/thesuhu/writelog/blob/master/LICENSE
*/

const writelog = require('../writelog');
const rootpath = require('app-root-path');
const path = require('path');

// Test logging with default location
writelog.info('This is a log with the default location');

// Change log location
const newLogDir = path.join(rootpath.path, 'mylogs');
writelog.changeLogLocation(newLogDir);

// Test logging with new location
writelog.info('This is a log with the new location');
writelog.warn('This is a warning log');
writelog.error('This is an error log');

// Test logging with stack trace
try {
  throw new Error('This is an error with stack trace');
} catch (error) {
  writelog.error(error);
}

// Test logging with HTTP request information
const mockRequest = {
  method: 'POST',
  path: '/api/users',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0',
  },
  query: {
    id: '123',
  },
  body: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  params: {
    userId: '456',
  },
  ip: '127.0.0.1',
  originalUrl: '/api/users?id=123',
};

try {
  throw new Error('This is an error from API endpoint');
} catch (error) {
  writelog.error(error, { request: mockRequest });
}