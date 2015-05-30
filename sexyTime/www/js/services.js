var BASE_URL = 'http://sexytime.felixmilea.com';

angular.module('starter.services', [])

.factory('Camera', ['$q', function($q) {

	return {
		getPicture: function(options) {
			var q = $q.defer();
			
			navigator.camera.getPicture(function(result) {
				// Do any magic you need
				q.resolve(result);
			}, function(err) {
				q.reject(err);
			}, options);
			
			return q.promise;
		}
	}
}])

.factory('photos', ['$http', '$window', function($http, $window){
	var photoService = {};

	photoService.savePicture = function(){
		$http.post('/photo', photo).success(function(data){

		}).error(function(err){

		});
	};

	return photoService;
}])

.factory('ratings', ['$http', '$window', function($http, $window){
	var ratingService = {};

	ratingService.getNextPhoto = function(){
		return $http.get(BASE_URL + '/rating').success(function(data){
			ratingService.photo = data;
			return ratingService.photo;
		}).error(function(err){
			alert('this is an error: ' + err);
		});
	};
	ratingService.upvote = function(){
		var rating = {
			photo: ratingService.photo.id,
			author: ratingService.photo.owner.id,
			value: 1
		}

		$http.post(BASE_URL + '/rating', rating).success(function(data){}).error(function(err){});
		ratingService.getNextPhoto();
	};
	ratingService.downvote = function(){
		var rating = {
			photo: ratingService.photo.id,
			author: ratingService.photo.owner.id,
			value: -1
		}

		$http.post(BASE_URL + '/rating', rating).success(function(data){}).error(function(err){});
		ratingService.getNextPhoto();
	}

	return ratingService;
}]);
