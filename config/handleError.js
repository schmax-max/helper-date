'use strict'
const bugsnag = require ('bugsnag')
bugsnag.register('e6c7350aa731d5d80e0186c73e5623c8', {
    sendCode: true
})

function handleError (location, error, data) {
    const obj = { error, data }
    bugsnag.notify(new Error(location), obj)
}


module.exports = handleError
