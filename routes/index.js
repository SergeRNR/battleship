var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Battleship',
        rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
        cols: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    });
});

module.exports = router;