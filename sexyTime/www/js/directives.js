angular.module('sexyTime.directives', [])

.directive('appLogo', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/partials/logo.html'
	};
});
