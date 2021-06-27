const path = require("path");
const express = require("express");
const app = express(); // create express app
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');


const userSignup = require('./routes/userSignup');
const userDetail = require('./routes/userDetail');
const updateInfo = require('./routes/updateInfo');
const request_pharmacy_by_your_location = require('./routes/request_pharmacy_by_your_location');
const pharmacy = require('./routes/pharmacy');
const insert_prescription_order = require('./routes/insert_prescription_order');
const userOrders = require('./routes/userOrders');
const contact_us = require('./routes/contact_us');
const dashboard = require('./routes/dashboard');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/users', userSignup);
app.use('/users', userDetail);
app.use('/users', updateInfo);
app.use('/users', request_pharmacy_by_your_location);
app.use('/users', pharmacy);
app.use('/users', insert_prescription_order);
app.use('/users', userOrders);
app.use('/users', contact_us);
app.use('/users', dashboard);



//show the view with css, html, etc...
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "/")));
//app.use(express.static("public"));


//port 
app.listen(port, () => {
  console.log("server started on port " + port);
});

//All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


//Error Handling
app.use((req, res, next) => {
  next(createError(404));
})

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});



