function handleError($state, error) {
	$state.go('error', { error: error });
}

angular.module('sexyTime.controllers', ['ngCordova'])

.config(['$compileProvider', function($compileProvider) {
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
}])

.controller('HomeController', ['$scope', '$state', 'User', function($scope, $state, User) {

	if (User.hasLocalAccount()) {
		User.getRemoteStatus()
			.success(function(status) {
				if (status.isAuth) {
					$state.go('main');
				} else {
					User.login()
						.success(function(me) {
							$state.go('main');
						})
						.catch(function(err) {
							if (err.status === 403) {
								User.deleteLocalAccount();
								$state.go('signup.welcome');
							} else {
								handleError($state, err);
							}
						});
				}
			})
			.catch(function(err) { handleError($state, err); });
	} else {
		// TODO: figure out how to redirect to just signup despite it being abstract
		$state.go('signup.welcome');
	}

}])

.controller('SignupController', ['$scope', '$state', 'User', function($scope, $state, User) {

	$scope.genders = ['male', 'female'];

	$scope.user = {
		gender: '',
		gender_preference: []
	};

	$scope.genderPreferenceSelected = function (gender) {
		var idx = $scope.user.gender_preference.indexOf(gender);

		// is currently selected
		if (idx > -1) {
			$scope.user.gender_preference.splice(idx, 1);
		}

		// is newly selected
		else {
			$scope.user.gender_preference.push(gender);
		}
	};

	$scope.signup = function() {
		console.log('creating account?');
		User.createAccount($scope.user)
			.then(function(me) {
				$state.go('main');
			})
			.catch($state, handleError);
	};

}])

.controller('ProfileController', ['$scope', '$state', 'User', function($scope, $state, User) {

	User.getRemoteAccount()
		.success(function(me) {
			$scope.user =	me;
		})
		.catch(function() {
			$scope.user =	User.getLocalAccount();
		});

	$scope.goToHome = function() {
		$state.go('main');
	};

}])

.controller('SettingsController', ['$scope', '$state', 'User', function($scope, $state, User) {
	$scope.genders = ['male', 'female'];
	$scope.user = User.getLocalAccount();

	console.log($scope.user);

	$scope.genderPreferenceSelected = function (gender) {
		var idx = $scope.user.gender_preference.indexOf(gender);

		// is currently selected
		if (idx > -1) {
			$scope.user.gender_preference.splice(idx, 1);
		}

		// is newly selected
		else {
			$scope.user.gender_preference.push(gender);
		}
	};

	$scope.save = function() {
		User.updateLocalAccount($scope.user);
		User.updateSettings();
	};

	$scope.goToHome = function() {
		$state.go('main');
	};

}])

.controller('MainController', ['$scope', '$state', '$ionicGesture', '$window', '$q', 'User', 'Photo', 'Rating', 'Camera', function($scope, $state, $ionicGesture, $window, $q, User, Photo, Rating, Camera) {

	function loadNextImage(cb, nth) {
		Photo.getNext(nth || 0)
			.success(function(photo) {
				$scope.bufferImage = photo;

				console.log('loaded new image: ', photo.id);

				if (cb) {
					cb(photo);
				}
			})
			.catch(function(err) {
				if (err.status === 404) {
					var photo = { url: 'http://dulieu.phim.pw/images/hinh404.png', placeholder: true };
					$scope.bufferImage = photo;

					if (cb) {
						cb(photo);
					}
				} else {
					handleError($state, err);
				}
			});
	}

	function transitionImage() {
		$scope.imageToRate = $scope.bufferImage;
		console.log('displaying image: ', $scope.imageToRate.id);
		loadNextImage(undefined, 1);
	}

	var wrapper = angular.element(document.querySelector('.imageRatingWrapper'));

	function handleSwipe(event) {
		if (!$scope.imageToRate || $scope.imageToRate.placeholder) return;

		var overlay = angular.element(document.querySelector('.overlay-' + event.gesture.direction));

		angular.element(document.querySelectorAll('.vote-overlay')).removeClass('on');

		wrapper.addClass('transition');
		overlay.addClass('on');

		setTimeout(transitionImage, 500);

		setTimeout(function() {
			transitionImage();
			overlay.addClass('fadeOut');

			setTimeout(function() {
				overlay.removeClass('on').removeClass('fadeOut');
				wrapper.removeClass('transition');
			}, 500);
		}, 700);
	}

	$ionicGesture.on('swipedown', handleSwipe, wrapper);
	$ionicGesture.on('swipeup', handleSwipe, wrapper);

	$scope.goToProfile = function() {
		$state.go('profile');
	};

	$scope.vote = function(weight) {
		if ($scope.imageToRate.placeholder) return;
		Rating.vote(weight, $scope.imageToRate)
			.success(function(data) {

			})
			.catch(function(err) { handleError($state, err); });
	}

	// handle picture taking
	$scope.takePhoto = function() {
		Camera.takePhoto()
			.then(function(data) {
				Photo.create({ url: data })
					.success(function(photo) { console.log(photo); })
					.catch(function(err) { handleError($state, err); });
				$state.go('main');
			})
			.catch(function(err) { handleError($state, err); });
	};

	$scope.$on('$viewContentLoaded', function() {
		loadNextImage(function() {
			transitionImage();
		});
	});

}])

.controller('ErrorController', ['$scope', '$state', function($scope, $state) {

	// log error to server

}]);
