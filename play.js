require('./config/connection')

const {commander} = require('./svc')
const {body} = require('./tests/data')

const res = commander(body)
console.log({res})  