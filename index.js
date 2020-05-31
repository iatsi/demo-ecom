process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log('Node NOT Exiting...');
});

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passsort = require('passport');

mongoose.connect(process.env.dbUrl || 'mongodb+srv://demo:demo@cluster0-4jtur.mongodb.net/demo', {
  useNewUrlParser: true
});

const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(passsort.initialize());
require('./config/passport.config');
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));

app.use('/api/seller', routes.seller);
app.use('/api/product', routes.product);
app.use('/api/order', routes.order);
app.use('/api/customer', routes.customer);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Server started @ ${port}`)
})
