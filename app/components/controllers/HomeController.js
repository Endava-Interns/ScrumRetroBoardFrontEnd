(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('HomeController', ['$scope', '$location', '$http', 'sessionService', HomeController]);

    function HomeController($scope, $location, $http, sessionService) {
        var homeVm = this;

        //scope models
        homeVm.sessionId = "";

        //scope method assignments
        homeVm.generateSessionId = generateSessionId;
        homeVm.joinSession = joinSession;

        //scope method definitions
        function generateSessionId() {
            sessionService.generateSessionId();
            $location.path('/user');
        }

        function joinSession() {
            sessionService.setSessionId(homeVm.sessionId);
            $location.path('/user');
        }
    }
})();

