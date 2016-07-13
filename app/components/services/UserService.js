app.factory('UserService', ['$http', function($http){


	return{

		saveUser: function(data, config){
			return $http.post('', data, config);
		}


	}

}]);