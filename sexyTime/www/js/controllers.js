angular.module('sexyTime.controllers', ['ngCordova'])

.config(['$compileProvider', function($compileProvider) {
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
}])

.controller('HomeController', ['$scope', '$state', 'User', function($scope, $state, User) {

	function handleError(error) {
		state.go('app.error', { error: error });
	}

	if (User.hasLocalAccount()) {
		User.getRemoteStatus()
			.then(function(status) {
				if (status.isAuth) {
					state.go('app.main');
				} else {
					User.createAccount()
						.then(function(me) {
							state.go('app.main');
						})
						.catch(handleError);
				}
			})
			.catch(handleError);
	} else {
		state.go('app.signup');
	}


}]);
