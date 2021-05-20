const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./server/database/connection');
const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8000;

// mongodb connection
connectDB();

//use morgan method is used for adding somes middleware
app.use(morgan('tiny'));

//use bodyparser method with the helpof use middleware because to use the body property
app.use(bodyparser.urlencoded({ urlencoded: true }));

//set method is used to inform the server we are using the ejs type of engine
app.set('view engine', 'ejs');

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))





// load routers
app.use('/', require('./server/routes/router'));

//with the help of listen method we do hosting on specific portno
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });