var BASE_URL = 'http://sexytime.felixmilea.com/';

function url(segment) {
	return BASE_URL + segment;
}

angular.module('starter.services', [])

.factory('Camera', function cameraFactory($q) {
	var CameraService = {
		getPicture: function() {
			var q = $q.defer();

			navigator.camera.getPicture(function(result) {
				q.resolve(result);
			}, function(err) {
				q.reject(err);
			}, {
					quality:          75,
					targetWidth:      320,
					targetHeight:     320,
					saveToPhotoAlbum: false
				});

			return q.promise;
		}
	};

	return CameraService;
})

.factory('User', function authFactory($q) {
	var userKey = 'user';

	var AuthService = {
		hasLocalAccount: function hasLocalAccount() {
			return !!AuthService.getLocalAccount();
		},

		hasRemoteAccount: function hasAccount() {
			var q = $q.defer();

			$http.get(url('auth/status'))
				.success(function(auth) {
					q.resolve(auth.status);
				}).error(function(err) {
					q.reject(err);
				});

			return q.promise;
		},

		getLocalAccount: function getLocalAccount() {
			return localStorage.getItem(userKey);
		},

		getRemoteAccount: function getFullAccount() {
			var q = $q.defer();

			$http.get(url('auth/me'))
				.success(function(user) {
					q.resolve(user);
				}).error(function(err) {
					q.reject(err);
				});

			return q.promise
		},

		createAccount: function createAccount() {
			var q = $q.defer();

			$http.post(url('auth/me'), AuthService.getLocalAccount())
				.success(function(me) {
					localStorage.setItem(userKey, me);
					q.resolve(me);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		},

		login: function login() {
			var q = $q.defer();

			var user = AuthService.getLocalAccount();
			$http.post(url('auth/me'), { userId: user.id, secret: user.secret })
				.success(function(auth) {
					q.resolve(auth);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		}
	};

	return AuthService;
})

.factory('Photo', function photoFactory($http, $q) {
	var PhotoService = {
		create: function createPhoto(photo) {
			var q = $q.defer();

			$http.post(url('/photo'), photo)
				.success(function(data) {
					q.resolve(data);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		},

		read: function readPhoto(photoId) {
			var q = $q.defer();

			$http.get(url('photo/' + photoId))
				.success(function(photo) {
					q.resolve(photo);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		},

		update: function updatePhoto(photo) {
			var q = $q.defer();

			$http.put(url('photo/' + photo.id))
				.success(function(uPhoto) {
					q.resolve(uPhoto);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		}
	};

	return PhotoService;
})

.factory('Rating', function($http, User) {
	var RatingService = {
		getNextPhoto: function() {
			var q = $q.defer();

			$http.get(url('rating'))
				.success(function(data) {
					q.resolve(data);
				})
				.error(function(err) {
					q.reject(err);
			});

			return q.promise;
		},

		vote: function(value, photo) {
			var q = $q.defer();

			var rating = {
				photo:  photo.id,
				author: User.getLocalAccount().id,
				value:  value
			};

			$http.post(url('rating'), rating)
				.success(function(data) {
					q.resolve(data);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		}

	};

	return ratingService;
});
