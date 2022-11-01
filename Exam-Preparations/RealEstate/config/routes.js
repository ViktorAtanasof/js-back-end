const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const rentController = require("../controllers/rentController");

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(rentController);

    app.use('/*', (req, res) => {
        res.render('404');
    });
}