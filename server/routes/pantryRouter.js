const router = require('express').Router();
let Items = require('../models/items');
let User = require('../models/user');

router.route("/").get((req, res) => {
    User.findById(req.query.userId)
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            const itemPromises = user.items.map(async function(itemId) {
                let item = await new Promise((resolve, reject) => {
                    Items.findById(itemId)
                    .exec((err, item) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(item);
                    });
                });
                return item;
            });
            Promise.all(itemPromises).then(items => {
                res.json(items);
            })
        })
});

router.route("/add").post((req, res) => {
    const newItem = new Items({
        name: req.body.name,
        count: req.body.count,
        expirationDate: req.body.expirationDate,
        user: req.body.user
    });
    newItem.save()
        .then((savedItem) => {
            User.findById(req.body.user)
                .exec((err, user) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.items.push(savedItem._id);
                    user.save()
                        .then((updatedUser) => {

                        res.status(200).send({
                            itemAdded: savedItem,
                            updatedUser: updatedUser
                        });
                    });
                });
        })
});

router.route("/searchItem").get((req, res) => {
    Items.findOne({ name: req.query.item })
        .then(item => {
            if (item) {
                return res.json(item);
            }
        })
        .catch(err => res.status(404).json("Error: " + err));
})

router.route("/:id").get((req, res) => {
    Items.findById(req.params.id)
        .then(item => {
            if (item) {
                return res.json(item);
            }
        })
        .catch(err => res.status(404).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Items.findByIdAndDelete(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(404).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
    Items.findByIdAndUpdate(req.params.id, { count: req.body.count })
        .then(item => res.json(item))
        .catch(err => res.status(404).json("Error: " + err));
});

module.exports = router;