(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .service('sessionService', ['$http', sessionService]);

    function sessionService($http) {
        var newSession = false;
        var sessionId = "";
        var sessionApiUrl = 'https://endava-scrum-app-staging.azurewebsites.net/api/Sessions/';
        var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
            'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];

        this.createSession = createSession;
        this.generateSessionId = generateSessionId;
        this.getSessionId = getSessionId;
        this.sessionExists = sessionExists;
        this.setSessionId = setSessionId;

        function createSession() {
            var session = {
                session_id: sessionId,
                is_changed: false
            };
            return $http
                .post(sessionApiUrl, session)
                .success(successCallback)
                .error(errorCallback);

            function successCallback(response) {
                return response.data;
            }

            function errorCallback(response) {
                console.log(response.data);
            }
        }

        function generateSessionId() {
            sessionId = generateRandomId();
        }

        function getSessionId() {
            return sessionId;
        }

        function generateRandomId() {
            var str = "";
            for (var i = 0; i < 10; i++) {
                var randomNum = Math.floor(Math.random() * alphabet.length);
                str += alphabet[randomNum];
            }
            return str;
        }

        function sessionExists(sessionId) {
            return $http({
                method: 'GET',
                url: sessionApiUrl + 'SessionExists/' + sessionId
            });

        }

        function setSessionId(_sessionId) {
            sessionId = _sessionId;
        }
    }
})();

