app.controller('UsernameController', ['$scope', function($scope){

	$scope.username = '';

	$scope.save = function(){

		var data = $.param({
                "username": $scope.username,

        });


        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };


	}


}]);