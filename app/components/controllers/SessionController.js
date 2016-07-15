(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('SessionController', ['$scope', '$location', '$state', '$http', 'messagesService', 'userService', SessionController]);

    function SessionController($scope, $location, $state, $http, messagesService, userService) {
        var sessionVm = this;

        //scope models
        sessionVm.messageText = "";
        sessionVm.type = "";

        sessionVm.clearMessageText = clearMessageText;
        sessionVm.addMessageToSession = addMessageToSession;

        function clearMessageText() {
            sessionVm.messageText = "";
        }

        function addMessageToSession(messageCategory){
            messagesService.addMessageToSession(sessionVm.messageText, messageCategory);
            clearMessageText();
            $state.reload();
        }
    }
})();

