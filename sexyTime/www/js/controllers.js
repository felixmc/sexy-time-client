function handleError($state, error) {
	$state.go('app.error', { error: error });
}

angular.module('sexyTime.controllers', ['ngCordova'])

.config(['$compileProvider', function($compileProvider) {
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
}])

.controller('HomeController', ['$scope', '$state', 'User', function($scope, $state, User) {

	if (User.hasLocalAccount()) {
		User.getRemoteStatus()
			.then(function(status) {
				if (status.isAuth) {
					$state.go('main');
				} else {
					User.createAccount()
						.then(function(me) {
							$state.go('main');
						})
						.catch($state, handleError);
				}
			})
			.catch($state, handleError);
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


}])






;



