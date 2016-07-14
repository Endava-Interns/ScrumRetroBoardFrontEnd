(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('UserController', ['$scope', '$http', 'sessionService', 'userService', UserController]);

    function UserController($scope, $http, sessionService, userService) {
        var userVm = this;

        //scope models
        userVm.username = "";
        userVm.sessionId = "";
        
        //scope method assignments
        userVm.createAndJoinSession = createAndJoinSession;
        userVm.printSessionId = printSessionId;

        //scope method definitions
        function createAndJoinSession() {
            sessionService.createSession();
            userService.addUserToSession(userVm.username, sessionService.getSessionId());
        }

        function joinExistingSession() {
            userService.addUserToSession(userVm.username, sessionService.getSessionId());
        }

        function printSessionId() {
            userVm.sessionId = sessionService.getSessionId();
        }
    }
})();

