var BASE_URL = 'http://sexytime.felixmilea.com/';

function url(segment) {
	return BASE_URL + segment;
}

angular.module('sexyTime.services', [])

.factory('Camera', function cameraFactory($q, $cordovaCamera) {
	var options = {
		quality: 75,
		destinationType: Camera.DestinationType.DATA_URL,
		sourceType: Camera.PictureSourceType.CAMERA,
		allowEdit: true,
		encodingType: Camera.EncodingType.JPEG,
		targetWidth: 700,
		targetHeight: 700,
		popoverOptions: CameraPopoverOptions,
		saveToPhotoAlbum: false
	};

	var CameraService = {
		getPicture: function() {
			return $cordovaCamera.getPicture(options);
		}
	};

	return CameraService;
})

.factory('User', function userFactory($q) {
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

		getRemoteStatus: function isLoggedIn() {
			return $http.get(url('auth'));
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
