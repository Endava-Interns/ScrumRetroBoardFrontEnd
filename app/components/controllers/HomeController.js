(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('HomeController', ['$scope', '$state', '$http', 'sessionService', HomeController]);

    function HomeController($scope, $state, $http, sessionService) {
        var homeVm = this;

        //scope models
        homeVm.showErrorMsg = false;
        homeVm.sessionId = "";

        //scope method assignments
        homeVm.generateSessionId = generateSessionId;
        homeVm.joinSession = joinSession;

        //scope method definitions
        function generateSessionId() {
            sessionService.generateSessionId();
            $state.go('user');
        }

        function joinSession() {
            var sessionExists;
            sessionService
                .sessionExists(homeVm.sessionId)
                .then(function (response) {
                    sessionExists = response.data;
                    console.log(response.data);
                    if (sessionExists) {
                        sessionService.setSessionId(homeVm.sessionId);
                        $state.go('user');
                    } else {
                        homeVm.showErrorMsg = true;
                    }
                });
        }
    }
})();

