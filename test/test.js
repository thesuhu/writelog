/**
  * MIT License
  * https://github.com/thesuhu/writelog/blob/master/LICENSE
*/

const writelog = require("../writelog")

// log info
writelog.info('This is cool info')

// generate fake error
let error = new Error('This is an fake error')
writelog.error(error.message)
