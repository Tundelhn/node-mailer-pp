const express = require('express');
const exphbs = require('express-handlebars');
const nodeMailer = require('nodemailer');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
   <p>You Have A Contact Mail From A Mailer</p>
   <h3>Contact Details</h3>
   <ul>
     <li>Name: ${req.body.name}</li>
     <li>Company: ${req.body.company}</li>
     <li>Email: ${req.body.email}</li>
     <li>Phone: ${req.body.phone}</li>
   </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
   `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'user@gmail.com', // generated ethereal user
      pass: '457755' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object

  let info = transporter.sendMail({
    from: '"nodemailer contact" <ayodeleolumidetunde@gmail.com>', // sender address
    to: 'tunde.lhn@gmail.com ,veronicaibobo@gmail.com,kevinberg41@yahoo.com', // list of receivers
    subject: 'Tunde testing his app ✔', // Subject line
    text: 'tunde is testing is app', // plain text body
    html: output // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.render('contact', { msg: 'email has been sent' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
