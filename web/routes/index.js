var express = require('express');
var router = express.Router();

var serverInfo = { server: process.env.SERVER || 'http://localhost:3000' };

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Web Uruapan', serverInfo: serverInfo });
    res.render('index2', { title: 'Web Uruapan', serverInfo: serverInfo });
});
router.get('/prueba', function(req, res, next) {
    res.render('prueba', { title: 'Web Uruapan', serverInfo: serverInfo });
});

module.exports = router;