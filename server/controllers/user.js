const User = require("../models/user");

exports.getUserById = (req, res) => {
    console.log(req.params.id);
    User.findOne({ id: req.params.id })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            res.status(200).send(user);
        });
}