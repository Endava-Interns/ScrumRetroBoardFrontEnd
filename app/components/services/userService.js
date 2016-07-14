(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .service('userService', ['$http', 'sessionService', userService]);

    function userService($http, sessionService) {
        var userApiUrl = "";

        function addUserToSession(username, sessionId) {
            var user = {
                session_id: sessionId,
                username: username
            };
            return $http
                .post(userApiUrl, user)
                .success(successCallback)
                .error(errorCallback);

            function successCallback(response) {
                return response.data;
            }

            function errorCallback(response) {
                console.log(response.data);
            }
        }
    }
})();