// SexyTime App

angular.module('sexyTime', ['ionic', 'sexyTime.directives', 'sexyTime.controllers', 'sexyTime.services', 'ngCordova'])

.run(function($ionicPlatform, $rootScope) {
	$ionicPlatform.ready(function() {
		console.log('Ionic is ready');

		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}

		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			console.log('LET THERE BE STATUS');
			StatusBar.styleDefault();
		}
	});

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		$rootScope.containerClass = toState.name.replace(/\./g, '-');
	});

})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'templates/home.html',
		controller: 'HomeController'
	})

	.state('error', {
		url: '/error/:error',
		templateUrl: 'templates/error.html',
		controller: 'ErrorController'
	})

	.state('signup', {
		url: '/signup',
		abstract: true,
		templateUrl: 'templates/signup.html'
	})

	.state('signup.welcome', {
		url: '',
		templateUrl: 'templates/signup.welcome.html'
	})

	.state('signup.verify', {
		url: '/verify',
		templateUrl: 'templates/signup.verify.html'
	})

	.state('signup.setup', {
		url: '/setup',
		templateUrl: 'templates/signup.setup.html',
		controller: 'SignupController'
	})

	.state('main', {
		url: '/main',
		templateUrl: 'templates/main.html'
	})

	.state('profile', {
		url: '/profile',
		templateUrl: 'templates/profile.html'
	})

	.state('settings', {
		url: '/settings',
		templateUrl: 'templates/settings.html'
	})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/');
}]);
