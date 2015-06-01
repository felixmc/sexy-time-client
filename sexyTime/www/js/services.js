var BASE_URL = 'http://sexytime.felixmilea.com/';

function url(segment) {
	return BASE_URL + segment;
}

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

.factory('User', function authFactory() {
	var userKey = 'user';

	var AuthService = {
		hasLocalAccount: function hasLocalAccount() {
			return !!AuthService.getLocalAccount();
		},
		hasRemoteAccount: function hasAccount(cb) {
			$http.get(url('auth/status')).success(function(auth) {
				cb(auth.status);
			});
		},
		getLocalAccount: function getLocalAccount() {
			return localStorage[userKey];
		},
		getRemoteAccount: function getFullAccount() {
			$http.get(url('auth/me')).success(cb);
		},
		createAccount: function createAccount() {
			$http.post(url('auth/me'), AuthService.getLocalAccount()).success(function(me) {
				localStorage[userKey] = me;
				cb(me);
			});
		},
		login: function login(cb) {
			var user = AuthService.getLocalAccount();
			$http.post(url('auth/me'), { userId: user.id, secret: user.secret }).success(function(auth) {
				cb(auth);
			});
		}
	};

	return AuthService;
})

.factory('Photo', function photoFactory($http, $window) {
	var PhotoService = {
		create: function createPhoto(photo, cb) {
			$http.post(url('/photo'), photo).success(function(data) {
				cb(null, data);
			}).error(function(err) {
				cb(err);
			});
		},
		read: function readPhoto(photoId, cb) {
			$http.get(url('/photo/' + photoId)).success(function(photo) {
				cb(null, photo);
			}).error(function(err) {
				cb(err);
			});
		},
		update: function updatePhoto(photo, cb) {
			$http.put(url('/photo/' + photo.id)).success(function(uPhoto) {
				cb(null, uPhoto);
			}).error(function(err) {
				cb(err);
			});
		}
	};

	return PhotoService;
})

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
