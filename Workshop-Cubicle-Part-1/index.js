//const env = process.env.NODE_ENV || 'development';
//const config = require('./config/config')[env];
const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

const homeController = require('./controllers/homeController');
const defaultController = require('./controllers/defaultController');
const detailsController = require('./controllers/detailsController');
const createController = require('./controllers/createController');

const app = express();
//const bodyParser = require('body-parser');

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

/* require('./config/routes')(app);
require('./config/express')(app); */

app.use(homeController);
app.use('/details', detailsController);
app.use('/create', createController);

app.use(defaultController);

app.listen(3000, () => console.log(`Listening on port 3000!`));
