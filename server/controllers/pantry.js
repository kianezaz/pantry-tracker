const User = require('../models/user');
const Items = require('../models/items');

exports.getItemById = (req, res) => {
    Items.findById(req.query.id)
    .exec((err, item) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        if (!item) {
            res.status(404).send({ message: "Item not found"});
        }

        res.status(200).send(item);
    });
}

exports.getUserItemsById = (req, res) => {
    console.log("user: " + req.query.userId);
    User.findById(req.query.userId)
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            console.log("here");

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
        });
}

exports.addRecipe = (req, res) => {
    const newItem = new Items({
        name: req.body.name,
        count: req.body.count,
        expirationDate: req.body.expirationDate,
        user: req.body.userId
    });
    newItem.save()
        .then((savedItem) => {
            User.findById(req.body.userId)
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
        });
}

exports.deleteRecipeById = (req, res) => {
    Items.findByIdAndDelete(req.query.id)
        .exec((err, deletedItem) => {
            if (err) {
                res.status(500).send({ message: err });
                        return;
            }

            User.findById(req.query.userId)
                .exec((err, user) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.items = user.items.filter(itemId => itemId != req.query.id);
                    user.save()
                        .then(updatedUser => {
                            res.status(200).send({
                                itemDeleted: deletedItem,
                                updatedUser: updatedUser
                            });
                        });
                });
        });
}

exports.updateItemCountById = (req, res) => {
    Items.findByIdAndUpdate(req.query.id, { count: req.body.count })
        .exec((err, updatedItem) => {
            if (err) {
                res.status(500).send({ message: err });
            }

            res.status(200).send(updatedItem);
        })
}