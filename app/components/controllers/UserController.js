(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('UserController', ['$scope', '$http', '$state', 'sessionService', 'userService', UserController]);

    function UserController($scope, $http, $state, sessionService, userService) {
        var userVm = this;

        //scope models
        userVm.username = "";
        userVm.newSession = null;
        userVm.sessionId = sessionService.getSessionId();
        
        sessionService
            .sessionExists(userVm.sessionId)
            .then(function (response) {
                userVm.newSession = !response.data;
            });

        //scope method assignments
        userVm.createAndJoinSession = createAndJoinSession;
        userVm.joinExistingSession = joinExistingSession;

        //scope method definitions
        function createAndJoinSession() {
            sessionService
                .createSession()
                .then(function (response) {
                    joinExistingSession();
                });
        }

        function joinExistingSession() {
            userService.setUsername(userVm.username);
            userService
                .addUserToSession(userVm.sessionId)
                .then(function(response) {
                    userService.setUserId(response.data.id);
                });
            $state.go('session', { 'id': userVm.sessionId });
        }
    }
})();

