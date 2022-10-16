const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const Product = require('./models/productModel')
const Category = require('./models/categoriesModel')

const productsRouter = require('./routes/productsRouter')(Product);
const categoriesRouter = require('./routes/categoriesRouter')(Category);


const uri = 'mongodb+srv://mohamedwaheed:XOf5cHTYeNPIQidx@globomantics.lota4m8.mongodb.net/test';
try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log("connected"));
} catch (error) {
  console.log("could not connect");
}



app.use('/api', productsRouter);
app.use('/api', categoriesRouter);


app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
