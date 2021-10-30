const router = require('express').Router();

router.route('/apiKey').get((req, res) => {
    res.json(process.env.SPOONACULAR_API_KEY);
})

module.exports = router;