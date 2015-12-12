var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('none', { title: 'Find your local representatives' });
});

module.exports = router;
