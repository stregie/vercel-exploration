require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const path = require('path');
const { sql } = require('@vercel/postgres');

const app = express();

app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'server', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const routes = require('./server/routes/routes');
app.use('/', routes);

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;

