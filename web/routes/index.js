var express = require('express');
var router = express.Router();
var body = undefined;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/miEmpresa', function(req, res, next) {
    body = req.body;
});

router.get('/miEmpresa', function(req, res, next) {
    res.json(body);
});

module.exports = router;
