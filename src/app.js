const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄 Hey this is Novpa',
  });
});

app.post('/detect-language', async (req, res) => {
  try {
    const response = await fetch('https://ws.detectlanguage.com/0.2/detect', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DETECT_LANGUAGE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: textInput }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error detecting language:', error);
    res.status(500).send('Error detecting language');
  }
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
