const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
var nodemailer = require('nodemailer');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
app.post('/adminemail',(req,res)=>{
  const {user_name,address,phone,time,email,amount,postcode,paymentMethod,cartItems,rechargeNum,notes,reciever} = req.body  
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
    auth: {
           user: process.env.EMAIL,
           pass: process.env.PASSWORD
       }
   });
  let c = cartItems.map(cartItem=>{
   return '<tr><td>'+cartItem.name + '</td><td>' + cartItem.quantity + '</td><td>' + cartItem.title + '</td><td>' + '</td></tr>'
  })
  let mailOptions = {
    from: process.env.EMAIL, // sender address
    to: process.env.EMAIL, // list of receivers
    subject: 'An Order has been Placed', // Subject line
    html: `
      <h1>You have recieved an order</h1>
      <h4>Name: ${user_name} </h4>
      <h4>Address: ${address} </h4>
      <h4>Phone: ${phone} </h4>
      <h4>Time: ${time} </h4>
      <h4>Amount: ${amount} </h4>
      <h4>Postal Code: ${postcode} </h4>
      <h4>Payment Method: ${paymentMethod} </h4>
      <h4>Recharge Number: ${rechargeNum} </h4>
      <h4>Reciever Name: ${reciever} </h4>
      <h4>Notes: ${notes} </h4>
      <div><table><thead><tr><th>Name</th><th>Url</th><th>Quantity</th><th>Restaurant</th></tr></thead><tbody> 
      ${c}
      </tbody></table></div>`
    
  };
  let mailOption = {
    from: 'Your Email', // sender address
    to: email, // list of receivers
    subject: 'Your Order has been Recieved', // Subject line
    html: `
      <h1>We have recieved your order</h1>
      <h4>Name: ${user_name} </h4>
      <h4>Address: ${address} </h4>
      <h4>Phone: ${phone} </h4>
      <h4>Time: ${time} </h4>
      <h4>Amount: ${amount} </h4>
      <h4>Postal Code: ${postcode} </h4>
      <h4>Payment Method: ${paymentMethod} </h4>
      <h4>Recharge Number: ${rechargeNum} </h4>
      <h4>Reciever Name: ${reciever} </h4>
      <h4>Notes: ${notes} </h4>
      <div><table><thead><tr><th>Name</th><th>Url</th><th>Quantity</th><th>Restaurant</th></tr></thead><tbody> 
      ${c}
      </tbody></table></div>
      <p>For More Information contact us at Your_Email_Address</p>`
    
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      res.json('err')
    else
      res.json('info');
  });
  transporter.sendMail(mailOption, function (err, info) {
    if(err)
      res.json('err')
    else
      res.json('info');
  });
  })