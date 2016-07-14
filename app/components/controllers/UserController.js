(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('UserController', ['$scope', '$http', 'sessionService', 'userService', UserController]);

    function UserController($scope, $http, sessionService, userService) {
        var userVm = this;

        //scope models
        userVm.newSession = null;
        userVm.username = "";
        userVm.sessionId = sessionService.getSessionId();

        console.log(userVm.sessionId);

        sessionService.sessionExists(userVm.sessionId).then(function(response) {
            userVm.newSession = !response.data;
            console.log(response.data);
        });
        
        //scope method assignments
        userVm.createAndJoinSession = createAndJoinSession;
        userVm.joinExistingSession = joinExistingSession;

        console.log(userVm.sessionId);

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

