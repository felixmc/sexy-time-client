angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
			$scope.closeLogin();
		}, 1000);
	};
})

.controller('RatingCtrl', ['$scope', 'ratings', function($scope, ratings) {
	$scope.photoURL = function(){
		return ratings.photo;
	};
	$scope.upvote = function(){
		ratings.upvote();
	};
	$scope.downvote = function(){
		ratings.downvote();
	};
}])

.controller('PhotoCtrl'/*, ['$scope', '$cordovaCamera', 'photos'*/, function($scope, $cordovaCamera) {

	console.log('camera: ', $cordovaCamera);

	$scope.takePicture = function() {
				var options = {
						quality : 75,
						destinationType : Camera.DestinationType.DATA_URL,
						sourceType : Camera.PictureSourceType.CAMERA,
						allowEdit : true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 300,
						targetHeight: 300,
						popoverOptions: CameraPopoverOptions,
						saveToPhotoAlbum: false
				};

				$cordovaCamera.getPicture(options).then(function(imageData) {
						$scope.imgURI = "data:image/jpeg;base64," + imageData;
				}, function(err) {
						// An error occured. Show a message to the user
				});
		}




	//	function onSuccess(imageData) {
//			var image = document.getElementById('myImage');
//			image.src = "data:image/jpeg;base64," + imageData;
//	}
//
//	function onFail(message) {
//			alert('Failed because: ' + message);
//	}
//
//	console.log('camera: ', $cordovaCamera);
//
//	$scope.takePicture = function() {
//
//		$cordovaCamera.getPicture({
//					quality: 75,
//					targetWidth: 320,
//					targetHeight: 320,
//					saveToPhotoAlbum: false
//				}).then(function(imageURI) {
//					console.log(imageURI);
//					$scope.lastPhoto = imageURI;
//				}, function(err) {
//					console.err(err);
//				});


//	$scope.takePicture = function() {
//				// var options = {
//				//     quality: 75,
//				//     destinationType: Camera.DestinationType.DATA_URL,
//				//     sourceType: Camera.PictureSourceType.CAMERA,
//				//     allowEdit: true,
//				//     encodingType: Camera.EncodingType.JPEG,
//				//     targetWidth: 100,
//				//     targetHeight: 100,
//				//     popoverOptions: CameraPopoverOptions,
//				//     saveToPhotoAlbum: false
//				// };
//				// alert('fuck yes');
//
//				// $cordovaCamera.getPicture(options).then(function(imageData) {
//				//     // Success! Image data is here
//				//     $scope.imgURI = "data:image/jpeg;base64," + imageData;
//				// }, function(err) {
//				//     // An error occured. Show a message to the user
//				// });
//			document.addEventListener("deviceready", onDeviceReady, false);
//			function onDeviceReady() {
//
//				navigator.camera.getPicture({
//					quality: 75,
//					targetWidth: 320,
//					targetHeight: 320,
//					saveToPhotoAlbum: false
//				}).then(function(imageURI) {
//					console.log(imageURI);
//					$scope.lastPhoto = imageURI;
//				}, function(err) {
//					console.err(err);
//				});
//
//
//				navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
//						destinationType: Camera.DestinationType.DATA_URL
//				});
//			}

//	};

//	setInterval(function(){$scope.takePicture();}, 1000);
////	alert('hello maam');
//	$scope.savePhoto = function(){
//
//	};
}
	//					]
					 )

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
