const fs = require('fs')

exports.body = JSON.parse(fs.readFileSync(`./tests/data/body.json`, 'UTF-8'))
