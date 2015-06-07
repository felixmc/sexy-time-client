angular.module('sexyTime.controllers', ['ngCordova'])

.config(function($compileProvider){
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('SignupCtrl', ['$scope', '$http', function($scope, $http){
	$scope.user = {};

	$scope.signup = function(){

	};
}])

.controller('RatingCtrl', ['$scope', '$state', 'Rating', function($scope, $state, Rating) {

	//$state.go('app.rating');

	$scope.photoURL = function(){
		return Rating.photo;
	};
	$scope.upvote = function(){
		Rating.vote(1, {id: "55699adaef8ada683e18e9c5"}, function(err, data){
			if (err){
				console.log('felix help: ' + err);
			}
			else {
				console.log('the data: ' + JSON.stringify(data));
			}
		});
	};
	$scope.downvote = function(){
		Rating.vote(-1, {id: "55699adaef8ada683e18e9c5"}, function(err, data){
			if (err){
				console.log('felix help down: ' + err);
			}
			else {
				console.log('the data down: ' + JSON.stringify(data));
			}
		});
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
//		$cordovaCamera.getPicture().then(function(imageURI) {
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
} )

.controller('ProfileCtrl', function($scope, $stateParams) {
});
