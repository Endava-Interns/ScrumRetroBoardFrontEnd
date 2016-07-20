(function () {
    "use strict";

    angular
        .module("scrum_retroboard")
        .controller("HomeController", ["$scope", "$state", "$http", "sessionService", "userService", HomeController]);

    function HomeController($scope, $state, $http, sessionService, userService) {
        var homeVm = this;

        //<scope-models>
        homeVm.activeSessions = 0;
        homeVm.activeUsers = 0;
        homeVm.showErrorMsg = false;
        homeVm.sessionId = "";
        //</scope-models>

        //<value-assignments>
        sessionService
            .getNumberOfActiveSessions()
            .then(function(response) {
                homeVm.activeSessions = response.data;
            });

        userService
            .getNumberOfActiveUsers()
            .then(function(response) {
                homeVm.activeUsers = response.data;
            })
        //</value-assignments>

        //<method-assignments>
        homeVm.generateSessionId = generateSessionId;
        homeVm.joinSession = joinSession;
        //</method-assignments>

        //<method-definitions>
        function generateSessionId() {
            sessionService.generateSessionId();
            $state.go("user");
        }

        function joinSession() {
            var sessionExists;
            sessionService
                .sessionExists(homeVm.sessionId)
                .then(function (response) {
                    sessionExists = response.data;
                    if (sessionExists) {
                        sessionService.setSessionId(homeVm.sessionId);
                        $state.go("user");
                    } else {
                        homeVm.showErrorMsg = true;
                    }
                });
        }
        //</method-definitions>
    }
}());

