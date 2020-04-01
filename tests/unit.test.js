const chai = require('chai')
// const mongoose = require('mongoose')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const should = require('chai').should()
chai.use(chaiAsPromised).should()

// require ('../config/connection')
const {commander} = require ('../svc')
const {body} = require ('./data')


  
const defaultTimeout = 60 * 1000 

describe('TEST: .... ||', () => {
    it('gets the date right', async () => {
        const response = commander(body)
        expect(response).to.be.a('string')
    })
})


