const express = require('express');
const cors = require('cors');
var List = require('collections/list');

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

app.post('/api/card', (req, res) => {
  const code = req.body.Code;
  const Date = req.body.Date;
  const Description = req.body.Description;
  const Tags = req.body.Tags;
  const Title = req.body.Title;

  console.log(req.body.Date + '\ndsdsdsdsds');

  global.dd = code;
  global.date = Date;
  global.description = Description;
  global.tags = Tags;
  global.title = Title;
});
app.get('/api/cardget', (req, res) => {
  console.log('xxxx' + global.dd);
  res.send([
    global.date,
    global.dd,
    global.description,
    global.tags,
    global.title,
  ]);
  console.log('dd');
});
app.post('/api/video', (req, res) => {
  const Abstract = req.body.Abstract;
  const Article = req.body.Article;
  const Date = req.body.Date;
  const Tags = req.body.Tags;
  const Title = req.body.Title;
  const img = req.body.img;

  console.log(req.body.Date + '\ndsdsdsdsds');

  global.dd = Abstract;
  global.date = Article;
  global.description = Date;
  global.tags = Tags;
  global.title = Title;
  global.img = img;
});
app.get('/api/videoget', (req, res) => {
  console.log('xxxx' + global.dd);
  res.send([
    global.date,
    global.dd,
    global.description,
    global.tags,
    global.title,
    global.img,
  ]);
  console.log('dd');
});

app.listen(3002, function (request, response) {
  console.log('server is running');
});
