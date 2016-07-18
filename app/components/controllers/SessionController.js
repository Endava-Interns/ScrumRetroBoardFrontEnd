(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('SessionController', [
            '$scope',
            '$location',
            '$state', '$http',
            'messagesService',
            'userService',
            'sessionService',
            SessionController
        ]);

    function SessionController($scope, $location, $state, $http, messagesService, userService, sessionService) {
        var sessionVm = this;

        //<scope-models>
        sessionVm.messageText = "";
        sessionVm.type = "";
        sessionVm.startMessages = [];
        sessionVm.stopMessages = [];
        sessionVm.continueMessages = [];
        //</scope-models>

        //<method-assignments>
        sessionVm.clearMessageText = clearMessageText;
        sessionVm.addMessageToSession = addMessageToSession;
        //</method-assignments>

        //<method-definitions>
        function clearMessageText() {
            sessionVm.messageText = "";
        }

        function addMessageToSession(messageCategory) {
            messagesService
                .addMessageToSession(sessionVm.messageText, messageCategory)
                .then(function(response) {
                    sessionService.updateSession(true);
                });
            clearMessageText();
            $state.reload();
        }
        //</method-definitions>

        //<method-calls>
        messagesService
            .getMessagesByCategory("Start")
            .then(function(response) {
                sessionVm.startMessages = response.data;
            });
        
        messagesService
            .getMessagesByCategory("Stop")
            .then(function(response) {
                sessionVm.stopMessages = response.data;
            });
        
        messagesService
            .getMessagesByCategory("Continue")
            .then(function(response) {
                sessionVm.continueMessages = response.data;
            });
        //</method-calls>
    }
})();

