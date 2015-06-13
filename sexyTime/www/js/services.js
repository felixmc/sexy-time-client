'use strict';

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
		takePhoto: function() {
			return $cordovaCamera.getPicture(options);
		}
	};

	return CameraService;
})

.factory('User', ['$q', '$http', function userFactory($q, $http) {
	var userKey = 'user';

	var AuthService = {
		hasLocalAccount: function hasLocalAccount() {
			return !!AuthService.getLocalAccount();
		},

		getLocalAccount: function getLocalAccount() {
			var user = localStorage.getItem(userKey);
			console.log('localUser', user);
			return user ? JSON.parse(user) : user;
		},

		saveLocalAccount: function saveLocalAccount(user) {
			localStorage.setItem(userKey, JSON.stringify(user));
		},

		updateLocalAccount: function updateLocalAccount(update) {
			var user = AuthService.getLocalAccount();
			user.gender = update.gender || user.gender;
			user.gender_preference = update.gender_preference || user.gender_preference;
			AuthService.saveLocalAccount(user);
		},

		getRemoteStatus: function getRemoteStatus() {
			return $http.get(url('auth'));
		},

		getRemoteAccount: function getRemoteAccount() {
			return $http.get(url('auth/me'));
		},

		createAccount: function createAccount(account) {
			var q = $q.defer();

			$http.post(url('auth/signup'), account)
				.success(function(me) {
					AuthService.saveLocalAccount(me);
					q.resolve(me);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		},

		updateSettings: function() {
			return $http.post(url('auth/update'), AuthService.getLocalAccount());
		},

		login: function login() {
			var user = AuthService.getLocalAccount();
			return $http.post(url('auth/login'), { userId: user.id, secret: user.secret });
		}
	};

	return AuthService;
}])

.factory('Photo', function photoFactory($http, $q) {
	var PhotoService = {
		create: function createPhoto(photo) {
			return $http.post(url('main/upload'), photo);
		},

		getNext: function() {
			return $http.get(url('main/rate'));
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

		vote: function(weight, photo) {
			var rating = {
				photo:  photo.id,
				weight: weight
			};

			return $http.post(url('main/rate'), rating);
		}

	};

	return RatingService;
});
