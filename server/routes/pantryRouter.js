const router = require('express').Router();
const auth = require('../middleware/auth');
let Items = require('../models/items');

router.route("/").get((req, res) => {
    Items.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const newItem = new Items({
        name: req.body.name,
        count: req.body.count,
        expirationDate: req.body.expirationDate
    });
    newItem.save()
        .then(() => res.json(newItem))
        .catch(err => res.status(400).json("Error:" + err));
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