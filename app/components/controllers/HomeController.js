(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('HomeController', ['$scope', '$state', '$http', 'sessionService', HomeController]);

    function HomeController($scope, $state, $http, sessionService) {
        var homeVm = this;

        //scope models
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
            sessionService.setSessionId(homeVm.sessionId);
            $state.go('user');
        }
    }
})();

