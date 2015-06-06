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
			return $http.get(url('auth/status'));
		},

		getLocalAccount: function getLocalAccount() {
			return localStorage.getItem(userKey);
		},

		getRemoteAccount: function getFullAccount() {
			return $http.get(url('auth/me'));
		},

		createAccount: function createAccount() {
			var q = $q.defer();

			$http.post(url('auth/signup'), AuthService.getLocalAccount())
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
			var user = AuthService.getLocalAccount();
			return $http.post(url('auth/me'), { userId: user.id, secret: user.secret });
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
			return $http.get(url('photo/' + photoId));
		},

		update: function updatePhoto(photo) {
			return $http.put(url('photo/' + photo.id));
		}
	};

	return PhotoService;
})


.factory('Rating', function($http, User) {
	var RatingService = {
		getNextPhoto: function() {
			return $http.get(url('rating'));
		},

		vote: function(value, photo) {
			var rating = {
				photo:  photo.id,
				author: User.getLocalAccount().id,
				value:  value
			};

			alert('felix check this out: ' + url('/rating'));

			return $http.post(url('rating'), rating);
		}

	};

	return RatingService;
});
