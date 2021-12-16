const router = require("express").Router();
const verifySignUp = require("../middleware/verifySignUp");
const signup = require("../controllers/auth").signup;
const signin = require("../controllers/auth").signin;
const getUserById = require("../controllers/user").getUserById;
const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/test");

router.route("/signup").post(verifySignUp, signup);

router.route("/signin").post(signin);

router.route("/:id").get(getUserById)

router.route("/all").get(controller.allAccess);

router.route("/private").get(authJwt, controller.userBoard);

module.exports = router;