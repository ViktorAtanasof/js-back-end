const artController = require("../controllers/artController");
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");

module.exports = (app) => {
    app.use('/', homeController);
    app.use(authController);
    app.use(artController);
    app.use(profileController);
    
    app.use('/*', (req, res) => {
        res.render('404');
    })
}