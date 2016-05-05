var express = require('express');
var router = express.Router();

var serverInfo = { server: process.env.SERVER || 'http://localhost:3000' };

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Web Uruapan', serverInfo: serverInfo }, function(err, html){
        res.send(html);
    });
});

module.exports = router;