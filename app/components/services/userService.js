(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .service('userService', ['$http', 'sessionService', userService]);

    function userService($http, sessionService) {
        var userApiUrl = "";
        var username = "";

        this.addUserToSession = addUserToSession;
        this.setUsername = setUsername;
        this.getUsername = getUsername;

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

        function setUsername(_username) {
            username = _username;
        }

        function getUsername() {
            return username;
        }
    }
})();