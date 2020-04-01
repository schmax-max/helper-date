const YAML = require('yaml')
const fs = require('fs')
const file = fs.readFileSync('./app.yaml', 'UTF-8')
const {service} = YAML.parse(file)

module.exports = service