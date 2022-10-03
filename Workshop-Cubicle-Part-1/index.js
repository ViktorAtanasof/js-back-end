//const env = process.env.NODE_ENV || 'development';
//const config = require('./config/config')[env];
const express = require('express');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');
//const bodyParser = require('body-parser');

/* require('./config/routes')(app);
require('./config/express')(app); */

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(3000, () => console.log(`Listening on port 3000!`));
}

start();