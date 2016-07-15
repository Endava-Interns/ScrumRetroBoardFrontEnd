(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .service('messagesService', ['$http', 'userService', messagesService]);

    function messagesService($http, userService) {
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        
        var messagesApiUrl = "https://scrum-retroboard.herokuapp.com/messages/";
        var messageText = "";
        var category = "";

        this.addMessageToSession = addMessageToSession;

        function addMessageToSession(messageText, category){
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
    }
})();