const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customer');
const customerAddressRoute =require('./routes/customerAddress')
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');
//const userRoutes = require('./routes/user');
const storeRoutes = require('./routes/store');
const storeRoleRoutes = require('./routes/roles');

const manufacturerRoutes = require('./routes/manufacturer');
const attributeRotes = require('./routes/attribute');
const specificationRoutes = require('./routes/specification');
const custRoutes = require('./routes/cust');

const userManagementRoutes = require('./routes/userManagement');
const accessModuleRoutes = require('./routes/accessModule');
const settingRoutes = require('./routes/settingRoutes');
const taxRoutes = require('./routes/tax');
const wishlistRoutes = require('./routes/wishlist');
const oauthRoute = require('./routes/oAuth');
const cartRoutes = require('./routes/cart');


const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;


// app
const app = express();

// fixing "413 Request Entity Too Large" errors
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

//moment js
app.locals.moment = require('moment');

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        // useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors({origin: '*'}));

// routes middleware
app.use('/api', authRoutes);
app.use('/api', customerRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);
app.use('/api', manufacturerRoutes);
app.use('/api', attributeRotes);
app.use('/api', userManagementRoutes);
app.use('/api', attributeRotes);
app.use('/api', custRoutes);
//app.use('/api', userRoutes);
app.use('/api', storeRoutes);
app.use('/api', specificationRoutes);
app.use('/api', accessModuleRoutes);
app.use('/api', settingRoutes);
app.use('/api', taxRoutes);
app.use('/api', wishlistRoutes);
app.use('/api', customerAddressRoute)
app.use('/oauth', oauthRoute);
app.use('/api',storeRoleRoutes)
app.use('/api',cartRoutes)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
});
