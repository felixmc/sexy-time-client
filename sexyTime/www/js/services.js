var BASE_URL = 'http://sexytime.felixmilea.com/';

function url(segment) {
	return BASE_URL + segment;
}

angular.module('starter.services', [])

.factory('Camera', ['$q', function($q) {
	var CameraService = {
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
	};

	return CameraService;
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
			return localStorage.getItem(userKey);
		},

		getRemoteAccount: function getFullAccount() {
			$http.get(url('auth/me')).success(cb);
		},

		createAccount: function createAccount() {
			$http.post(url('auth/me'), AuthService.getLocalAccount()).success(function(me) {
				localStorage.setItem(userKey, me);
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

.factory('Photo', function photoFactory($http) {
	var PhotoService = {
		create: function createPhoto(photo, cb) {
			$http.post(url('/photo'), photo).success(function(data) {
				cb(null, data);
			}).error(function(err) {
				cb(err);
			});
		},

		read: function readPhoto(photoId, cb) {
			$http.get(url('photo/' + photoId)).success(function(photo) {
				cb(null, photo);
			}).error(function(err) {
				cb(err);
			});
		},

		update: function updatePhoto(photo, cb) {
			$http.put(url('photo/' + photo.id)).success(function(uPhoto) {
				cb(null, uPhoto);
			}).error(function(err) {
				cb(err);
			});
		}
	};

	return PhotoService;
})

.factory('ratings', function($http, User) {
	var ratingService = {
		getNextPhoto: function(cb) {
			return $http.get(url('/rating'))
			.success(function(data) {
				cb(null, data);
			}).error(function(err) {
				cb(err, data);
			});
		},

		vote: function(value, photo, cb) {
			var rating = {
				photo:  photo.id,
				author: User.getLocalAccount().id,
				value:  value
			};

			alert('felix check this out: ' + url('/rating'));

			$http.post(url('/rating'), rating)
				.success(function(data) {
					cb(null, data);
				})
				.error(function(err) {
					cb(err, null);
			});
		}

	};

	return ratingService;
});
