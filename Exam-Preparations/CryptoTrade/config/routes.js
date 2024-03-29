const authController = require("../controllers/authController");
const cryptoController = require("../controllers/cryptoController");
const homeController = require("../controllers/homeController")

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(cryptoController);

    app.use('*', (req, res) => {
        res.render('404');
    })
}