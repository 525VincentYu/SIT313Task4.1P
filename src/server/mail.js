const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/insert', (req, res) => {
  const email = req.body.email;
  const message = {
    to: req.body.email,
    from: 'vincentyu525@gmail.com',
    subject: 'DEV@Deakin Welcome email',
    text: 'Test message from SendGrid',
    html: '<strong>Message sent by sendgrid.</strong>',
  };
  require('dotenv').config();
  console.log(process.env.SENDGRID_API_KEY);
  const sendGridMail = require('@sendgrid/mail');
  sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

  sendGridMail.send(message).then(() => {
    console.log('Email was successfully sent');
  });

  res.send("'Email was successfully sent'");

  console.log(email);
});

app.listen(3002, function (request, response) {
  console.log('server is running');
});
