(function () {
    "use strict";

    angular
        .module("scrum_retroboard")
        .service("userService", ["$http", "sessionService", userService]);

    function userService($http, sessionService) {
        var config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        var userApiUrl = "https://scrum-retroboard.herokuapp.com/users/";
        var userId = null;
        var username = "";

        this.addUserToSession = addUserToSession;
        this.setUsername = setUsername;
        this.setUserId = setUserId;
        this.getUsername = getUsername;
        this.getUserId = getUserId;
        this.getUsersBySessionId = getUsersBySessionId;
        this.confirmAlive = confirmAlive;
        this.getNumberOfActiveUsers = getNumberOfActiveUsers;

        function addUserToSession(sessionId) {
            var user = $.param({
                username,
                id: sessionId
            });
            return $http
                .post(userApiUrl + "new", user, config)
                .success(successCallback)
                .error(errorCallback);

            function successCallback(response) {
                return response.data;
            }

            function errorCallback(response) {
                return response.data;
            }
        }

        function deleteUserFromSession() {
            var data = $.param({
                id: userId
            });
            return $http
                .post(userApiUrl + "delete", data, config)
                .success(successCallback)
                .error(errorCallback);

            function successCallback(response) {
                return response.data;
            }

            function errorCallback(response) {
                return response.data;
            }
        }

        function setUserId(_userId) {
            userId = _userId;
        }

        function getUserId() {
            return userId;
        }

        function setUsername(_username) {
            username = _username;
        }

        function getUsername() {
            return username;
        }

        function getUsersBySessionId(sessionId) {
            return $http({
                method: "GET",
                url: userApiUrl + "all/" + sessionId
            });
        }

        function confirmAlive() {
            return $http({
                method: "GET",
                url: userApiUrl + "update/" + sessionService.getSessionId() + "/" + userId
            });
        }

        function getNumberOfActiveUsers() {
            return $http({
                method: "GET",
                url: userApiUrl + "count"
            });
        }
    }
}());