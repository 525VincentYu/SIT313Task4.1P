const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const Stripe = require('stripe')(
  'sk_test_51L0nNjKuatJVCh6U6eGlNoRJhYxlkLd2hO0XJH4EVvu3m7NptP9CTa62aOwKednCVpGdbORoOSt5Nu4enlfL0KvP00wVaoDuG6'
);
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3001;

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Your server is running on port 5000');
});

app.post('/payment', async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'aud',
    });
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });
});
