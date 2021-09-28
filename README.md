# writelog

[![npm](https://img.shields.io/npm/v/@thesuhu/writelog.svg?style=flat-square)](https://www.npmjs.com/package/@thesuhu/writelog)
[![Build Status](https://img.shields.io/travis/thesuhu/writelog.svg?branch=main&style=flat-square)](https://app.travis-ci.com/thesuhu/writelog)
[![license](https://img.shields.io/github/license/thesuhu/writelog?style=flat-square)](https://github.com/thesuhu/writelog/blob/master/LICENSE)


Write logs and rotate every day. This is simple template for loging error or info message to file. Also transport to console when run in development environment.

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
const writelog = require('@thesuhu/writelog')

writelog.info('Hello world!')

try {
    // some code
} catch(err) {
    writelog.error(err.message)
}
```

## License

[MIT](https://github.com/thesuhu/writelog/blob/master/LICENSE)