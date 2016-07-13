(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('HomeController', ['$scope', '$location', '$http', 'sessionService', HomeController]);

    function HomeController($scope, $location, $http, sessionService) {
        var homeVm = this;

        homeVm.createSession = createSession;

        console.log(sessionService.getSessionId());

        function createSession() {
            sessionService.createSession($http);
            changeLocation('/user');
        }

        function changeLocation(path) {
            $location.path(path);
        }


        function generateRandomId() {
            var str = "";
            for (var i = 0; i < 10; i++) {
                var randomNum = Math.floor(Math.random() * alphabet.length);
                str += alphabet[randomNum];
            }
            return str;
        }
    }
})();

