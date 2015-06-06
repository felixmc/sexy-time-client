// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('app.upload', {
		url: "/upload",
		views: {
			'menuContent': {
				templateUrl: "templates/upload.html",
				controller: 'PhotoCtrl'
			}
		}
	})

	.state('app.photo', {
		url: "/photo",
		views: {
			'menuContent': {
				templateUrl: "templates/photo.html",
				controller: 'PhotoCtrl'
			}
		}
	})
		.state('app.rating', {
			url: "/rating",
			views: {
				'menuContent': {
					templateUrl: "templates/rating.html",
					controller: 'RatingCtrl'
//					,
//					resolve: {
//						photo: ['ratings', function(ratings){
//							return ratings.getNextPhoto();
//						}]
//					}
				}
			}
		})

	.state('app.profile', {
		url: "/profile",
		views: {
			'menuContent': {
				templateUrl: "templates/profile.html",
				controller: 'PlaylistCtrl'
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/rating');
});
