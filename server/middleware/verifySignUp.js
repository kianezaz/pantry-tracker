const User = require("../models/user");

function verifySignUp(req, res, next) {
    User.findOne({ username: req.body.username })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Username is already taken"});
                return;
            }

            User.findOne({ email: req.body.email })
                .exec((err, user) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (user) {
                        res.status(400).send({ message: "Email is already taken"});
                        return;
                    }
                });

                next();
        });
}

module.exports = verifySignUp;