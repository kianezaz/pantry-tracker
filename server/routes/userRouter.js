const router = require("express").Router();
const verifySignUp = require("../middleware/verifySignUp");
const signup = require("../controllers/auth").signup;
const signin = require("../controllers/auth").signin;
const getUserById = require("../controllers/user").getUserById;

router.route("/signup").post(verifySignUp, signup);

router.route("/signin").post(signin);

router.route("/:id").get(getUserById)

module.exports = router;