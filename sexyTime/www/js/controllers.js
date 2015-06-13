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
						.catch($state, handleError);
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

.controller('MainController', ['$scope', '$state', '$ionicGesture', '$window', 'User', 'Photo', 'Rating', 'Camera', function($scope, $state, $ionicGesture, $window, User, Photo, Rating, Camera) {

	function loadNextImage() {
		Photo.getNext()
			.success(function(photo) {
				$scope.imageToRate = photo;
			})
			.catch(function(err) {
				if (err.status === 404) {
					$scope.imageToRate = { url: 'http://dulieu.phim.pw/images/hinh404.png', placeholder: true };
				} else {
					handleError($state, err);
				}
			});
	}

	$ionicGesture.on('swipedown', function(event) {
		console.log('event: ', event);
	}, angular.element(document.querySelector('.imageRatingWrapper')));

	$ionicGesture.on('swipeup', function(event) {
																																																									 console.log('event: ', event);
	}, angular.element(document.querySelector('.imageRatingWrapper')));

	$scope.goToProfi            le = function() {
		$state.go('prof                                                                                                                                                                            ile');
	};

	$scope.vote = function(weight) {
		console.log('vpted! ', weight);
		if ($scope.imageToRate.placeholder) return;
		Rating.vote(weight, $scope.imageToRate)
			.success(function(data) {
				loadNextImage();
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
		loadNextImage();
	});

}])

.controller('ErrorController', ['$scope', '$state', function($scope, $state) {

	// log error to server

}]);
