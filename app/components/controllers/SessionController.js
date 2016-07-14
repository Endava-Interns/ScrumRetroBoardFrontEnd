(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('SessionController', ['$scope', '$location', '$http', 'messagesService', 'userService', SessionController]);

    function SessionController($scope, $location, $http, messagesService, userService) {
        var sessionVm = this;

        //scope models
        sessionVm.messageText = "";
        sessionVm.type = "";

        sessionVm.clearMessageText = clearMessageText;
        sessionVm.addMessageToSession = addMessageToSession;

        function clearMessageText() {
            sessionVm.messageText = "";
        }

        function addMessageToSession(){

        }

    }
})();

