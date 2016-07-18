(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .service('messagesService', ['$http', 'userService', 'sessionService', messagesService]);

    function messagesService($http, userService, sessionService) {
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        var category = "";
        var messagesApiUrl = "https://scrum-retroboard.herokuapp.com/messages/";
        var messageText = "";
        var sessionApiUrl = 'https://endava-scrum-app-staging.azurewebsites.net/api/Sessions/';

        this.addMessageToSession = addMessageToSession;
        this.getMessagesByCategory = getMessagesByCategory;

        function addMessageToSession(messageText, category) {
            var message = $.param({
                content: messageText,
                userId: userService.getUserId(),
                category: category
            });

            return $http
                .post(messagesApiUrl + "new", message, config)
                .success(successCallback)
                .error(errorCallback);

            function successCallback(response) {
                return response.data;
            }

            function errorCallback(response) {
                console.log(response.data);
            }
        }

        function getMessagesByCategory(category) {
            return $http({
                method: 'GET',
                url: messagesApiUrl + "all/" + category
            });
        }

        function updateMessage(message) {
            //TODO: Add functionality
        }
    }
})();