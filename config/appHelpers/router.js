const express = require('express');
const router = express.Router();
const {master} = require('../../svc');
const service = require('../service');

router.post(`/${service}/:type`, trigger);

async function trigger (req, res, next) {
  console.log(`${service} triggered by ${req.params.type}`)
  const response = await master(req)
  res.send(response)
}

module.exports = router