const express = require('express');
const exphbs = require('express-handlebars');
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const env = require('./env.json');

//Init app
const app = express();

//Importing routes
const indexRoutes = require('./src/routes/indexRouter');
const imageRoutes = require('./src/routes/imageRouter');

//Settings
app.set('port', process.env.PORT || env.PORT);
app.set('views', path.join(__dirname, 'src/views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(multer({
    dest: path.join(__dirname, './public/uploads/temp')
}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Importing and init database
require('./src/config/database');

//Middleware
app.use(morgan('dev'));

//Global variables

//Routes
app.use(indexRoutes);
app.use(imageRoutes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Server listenning
app.listen(app.get('port'), () => {
    console.log(colors.yellow(`Server running in ${ env.HOST }:${ env.PORT}`));
});