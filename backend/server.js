const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notesRoutes');
const ConnectDB = require('./config/db');
dotenv.config();

const app = express();

app.get('/api',notesRoutes);

ConnectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log("Successfully Connected with PORT: ",PORT));