const mongoose = require ('mongoose')
let ensure_production_env = false
// ensure_production_env = true
let ensure_qa_env = false
// ensure_qa_env = true

if (ensure_production_env) {
    require('dotenv').config({path: './.envProd'})
} else if (ensure_qa_env) {
    require('dotenv').config({path: './.envQa'})
} else {
    require('dotenv').config()
}

const env = process.env.NODE_ENV || 'local'
const _DB_USERNAME = process.env._DB_USERNAME || 'micro'
const _DB_PASSWORD = process.env._DB_PASSWORD || 'password'
const _DB_HOSTS = process.env._DB_HOSTS || 'localhost:27017'
const _DB_DATABASE = process.env._DB_DATABASE || 'micro'
const _DB_OPTIONS = process.env._DB_OPTIONS || ''

let connectionString = `mongodb://${_DB_USERNAME}:${_DB_PASSWORD}@${_DB_HOSTS}/${_DB_DATABASE}${_DB_OPTIONS}`

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: false,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('===========')
    console.log(`connection made`)
    console.log(`env: ${env}`)
    console.log(`username: ${_DB_USERNAME}`)
    console.log('===========')

    
})
.catch((error) => { return console.log(error) })