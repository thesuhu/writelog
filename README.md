# writelog

[![npm](https://img.shields.io/npm/v/@thesuhu/writelog.svg?style=flat-square)](https://www.npmjs.com/package/@thesuhu/writelog)
[![license](https://img.shields.io/github/license/thesuhu/writelog?style=flat-square)](https://github.com/thesuhu/writelog/blob/master/LICENSE)


Write logs and rotate every day. This is a simple template for logging error or info messages to a file. Also transports to console when run in a development environment.

## Install

```sh
npm install @thesuhu/writelog --save
```

## Variables

Logs will be split per day and will be stored in a certain size and period. This module will read three environment variables.
* **MAXSIZE:** maximum file size, more than it will rotate. the units used are kilobyte, megabyte and gigabyte. Use `k`, `m` or `g` as the suffix. (default: `5m`) 
* **MAXFILES:** maximum period the log file will be kept. This is number of days. Use `d` as the suffix. (default: `30d`)
* **ENV:** this is environment development or not. Use `dev` to add transport to console. Other than `dev` will not be transported to console. (default: `dev`)

## Usage

below is an example of usage.
```js
const writelog = require('@thesuhu/writelog');
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
```

## Explanation

#### Test Logging with Default Location:

`writelog.info('This is a log with the default location')`: Logs an informational message using the default log location.

#### Change Log Location:

- `const newLogDir = path.join(rootpath.path, 'mylogs')`: Combines the application's root path with the `mylogs` directory to create a new path.
- `writelog.changeLogLocation(newLogDir)`: Changes the log storage location to the new directory.

#### Test Logging with New Location:

- `writelog.info('This is a log with the new location')`: Logs an informational message using the new log location.
- `writelog.warn('This is a warning log')`: Logs a warning message.
- `writelog.error('This is an error log')`: Logs an error message.

#### Test Logging with Stack Trace:

- The `try-catch block` is used to catch an error and log the stack trace if it exists.
- `writelog.error(error)`: Logs the error along with its stack trace.

#### Test Logging with HTTP Request Information:

- `mockRequest`: An object that simulates an HTTP request with various properties such as method, path, headers, query, body, params, ip, and originalUrl.
- The `try-catch block` is used to catch an error from an API endpoint and log the HTTP request information.
- `writelog.error(error, { request: mockRequest })`: Logs the error along with the HTTP request information.

That's all.

If you find this useful, please ⭐ the repository. Any feedback is welcome.

You can contribute or you want to, feel free to [**Buy me a coffee! :coffee:**](https://saweria.co/thesuhu), I will be really thankfull for anything even if it is a coffee or just a kind comment towards my work, because that helps me a lot.

## License

[MIT](https://github.com/thesuhu/writelog/blob/master/LICENSE)