const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const tutorialController = require("../controllers/tutorialController");
const { isGuest, hasUser } = require("../middlewares/guards");

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(tutorialController);

}