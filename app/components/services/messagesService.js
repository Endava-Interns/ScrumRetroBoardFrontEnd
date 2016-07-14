(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .service('messagesService', ['$http', 'userService', messagesService]);

    function messagesService($http, userService) {
        
        var messagesApiUrl = "";
        var messageText = "";
        var category = "";

        this.addMessageToSession = addMessageToSession;

        function addMessageToSession(username_id, messageText, category){
            var message = {
                text: messageText,
                user_id: username_id,
                category: category
            };

             return $http
                .post(messagesApiUrl, message)
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