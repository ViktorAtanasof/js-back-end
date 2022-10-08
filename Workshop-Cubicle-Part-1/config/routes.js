const homeController = require('../controllers/homeController');
const detailsController = require('../controllers/detailsController');
const createController = require('../controllers/createController');
const accessoryController = require('../controllers/accessoryController');
const defaultController = require('../controllers/defaultController');

module.exports = (app) => {
    app.use(homeController);
    app.use('/details', detailsController);
    app.use('/create', createController);
    app.use(accessoryController);

    app.use(defaultController);
}