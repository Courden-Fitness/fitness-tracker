require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors')
const router = require("./api/index")

// Setup your Middleware and API Router here

app.use('/api', router);
module.exports = app, cors;
