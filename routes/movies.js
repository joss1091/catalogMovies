var express = require('express');
var router = express.Router();

var movieHelper = require('../modules/MoviesHelper')



/* GET users listing. */

router.get('/random-movies', function(req, res, next) {
	movieHelper.getRandomSearch().then(function(resp){
		res.json(resp.Search);
		},function(error){
			res.render('error', { title: 'Express', error: error });
		})
});
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	movieHelper.getDetail(id,"short").then(function(resp){
		res.render('show', {movie: resp});
		console.log(resp);
		},function(error){
			res.render('error', { title: 'Express', error: error });
		})
});



module.exports = router;
