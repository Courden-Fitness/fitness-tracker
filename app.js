require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors')
const morgan = require("morgan");
const router = require("./api/index")
const client = require("./db/client");

client.connect();

// Setup your Middleware and API Router here
app.use(cors());
app.use(morgan());
app.use(express.json());

app.use('/api', router);
module.exports = app, cors;
