(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('UserController', ['$scope', '$http', 'sessionService', 'userService', UserController]);

    function UserController($scope, $http, sessionService, userService) {
        var userVm = this;

        //scope models
        userVm.newSession = false;
        userVm.username = "";
        userVm.sessionId = sessionService.getSessionId();

        sessionService
            .sessionExists(userVm.sessionId)
            .then(function(result) {
                userVm.newSession = result.data;
            });

        console.log(userVm.newSession);

        //scope method assignments
        userVm.createAndJoinSession = createAndJoinSession;
        userVm.joinExistingSession = joinExistingSession;

        //scope method definitions
        function createAndJoinSession() {
            sessionService.createSession();
            userService.addUserToSession(userVm.username, userVm.sessionId);
        }

        function joinExistingSession() {
            userService.addUserToSession(userVm.username, userVm.sessionId);
        }
    }
})();

