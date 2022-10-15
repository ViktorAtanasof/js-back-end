const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const hotelController = require("../controllers/hotelController");
const profileController = require("../controllers/profileController");
const { hasUser } = require("../middlewares/guards");

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(hasUser() ,hotelController);
    app.use(profileController);
}