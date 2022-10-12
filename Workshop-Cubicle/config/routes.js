const homeController = require('../controllers/homeController');
const detailsController = require('../controllers/detailsController');
const createController = require('../controllers/createController');
const accessoryController = require('../controllers/accessoryController');
const authController = require('../controllers/authController');
const defaultController = require('../controllers/defaultController');
const { hasUser } = require('../middlewares/guard');

module.exports = (app) => {
    app.use(homeController);
    app.use('/details', detailsController);
    app.use('/create', hasUser(), createController);
    app.use(accessoryController);
    app.use(authController);

    app.use(defaultController);
}