const router = require('express').Router();
let Items = require('../models/items');
let User = require('../models/user');
const pantryController = require('../controllers/pantry');
const authJwt = require("../middleware/authJwt");


router.route("/").get(pantryController.getUserItemsById);

router.route("/add").post(authJwt, pantryController.addRecipe);

router.route("/searchItem").get((req, res) => {
    Items.findOne({ name: req.query.item })
        .exec((err, item) => {
            if (err) {
                res.status(500).send({ message: err });
            }
            if (!item) {
                res.status(404).send({ message: "Item not found"});
            }

            res.status(200).send(item);
        });
});

router.route("/").get(authJwt, pantryController.getItemById);

router.route("/").delete(authJwt, pantryController.deleteRecipeById);

router.route("/").put(authJwt, pantryController.updateItemCountById);

module.exports = router;