// SexyTime App

angular.module('sexyTime', ['ionic', 'sexyTime.controllers', 'sexyTime.services', 'ngCordova'])

.run(function($ionicPlatform) {
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
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url: '/',
		templateUrl: 'home.html'
	})

	.state('app.signup', {
		url: '/signup',
		abstract: true,
		templateUrl: 'signup.html'
	})

	.state('app.signup.welcome', {
		url: '',
		templateUrl: 'signup.welcome.html'
	})

	.state('app.signup.verify', {
		url: '/verify',
		templateUrl: 'signup.verify.html'
	})

	.state('app.signup.setup', {
		url: '/setup',
		templateUrl: 'signup.setup.html'
	})

	.state('app.main', {
		url: '/main',
		templateUrl: 'main.html'
	})

	.state('app.profile', {
		url: '/profile',
		templateUrl: 'profile.html'
	})

	.state('app.settings', {
		url: '/settings',
		templateUrl: 'settings.html'
	})















	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/');
});
