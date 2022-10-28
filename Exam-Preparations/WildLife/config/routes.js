const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const postController = require("../controllers/postController");

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(postController);
}