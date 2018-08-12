const rm = require('rimraf')

rm('./dist', e => { if (e) throw e })