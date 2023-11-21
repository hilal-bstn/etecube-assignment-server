const express = require('express');
const cors = require("cors");
require('./config');
const authRoute = require('./routes/authRoute');
const companyRoute = require('./routes/companyRoute');
const productRoute = require('./routes/productRoute');

const Jwt = require('jsonwebtoken');
const { request } = require('express');
const jwtKey = "process-management";

const app = express();

app.use(express.json());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use('/auth', authRoute);
app.use('/company', companyRoute);
app.use('/product', productRoute); 

app.listen(5000);