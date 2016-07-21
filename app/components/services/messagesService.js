(function () {
    "use strict";

    angular
        .module("scrum_retroboard")
        .service("messagesService", ["$http", "userService", "sessionService", messagesService]);

    function messagesService($http, userService, sessionService) {
        var config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        var category = "";
        var messagesApiUrl = "https://scrum-retroboard.herokuapp.com/messages/";
        var messageText = "";
        var sessionApiUrl = "https://endava-scrum-app-staging.azurewebsites.net/api/Sessions/";

        this.addMessageToSession = addMessageToSession;
        this.getMessagesByCategory = getMessagesByCategory;
        this.updateMessage = updateMessage;

        function addMessageToSession(messageText, _category) {
            var message = $.param({
                content: messageText,
                userId: userService.getUserId(),
                category: _category
            });

            return $http
                .post(messagesApiUrl + "new", message, config)
                .success(successCallback)
                .error(errorCallback);

            function successCallback(response) {
                return response.data;
            }

            function errorCallback(response) {
                return response.data;
            }
        }

        function getMessagesByCategory(category) {
            return $http({
                method: "GET",
                url: messagesApiUrl + "all/" + category
            });
        }

        function updateMessage(_content, _messageId) {
            var message = $.param({
                content: _content,
                messageId: _messageId
            });

            return $http
                .post(messagesApiUrl + "update/", message, config)
                .success(successCallback)
                .error(errorCallback);

            function successCallback(response) {
                return response.data;
            }

            function errorCallback(response) {
                console.log(response.data);
            }
        }
    }
}());