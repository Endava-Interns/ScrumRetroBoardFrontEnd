(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('UserController', ['$scope', '$http', 'sessionService', 'userService', UserController]);

    function UserController($scope, $http, sessionService, userService) {
        var userVm = this;

        //scope models
        userVm.username = "";
        
        //scope method assignments
        userVm.createAndJoinSession = createAndJoinSession;
        userVm.joinExistingSession = joinExistingSession;

        //scope method definitions
        function createAndJoinSession() {
            sessionService.createSession();
            joinExistingSession();
        }

        function joinExistingSession() {
            userService.setUsername(userVm.username);
            userService.addUserToSession(userVm.username, sessionService.getSessionId());
        }
    }
})();

