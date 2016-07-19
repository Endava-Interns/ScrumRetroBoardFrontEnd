(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .controller('SessionController', [
            '$scope',
            '$location',
            '$state',
            '$http',
            '$interval',
            'messagesService',
            'userService',
            'sessionService',
            SessionController
        ]);

    function SessionController($scope, $location, $state, $http, $interval, messagesService, userService, sessionService) {
        var sessionVm = this;

        //<scope-models>
        sessionVm.activeUsers = [];
        sessionVm.messageText = "";
        sessionVm.type = "";
        sessionVm.startMessages = [];
        sessionVm.stopMessages = [];
        sessionVm.continueMessages = [];
        sessionVm.selectedMessage = null;
        //</scope-models>

        //<method-assignments>
        sessionVm.clearMessageText = clearMessageText;
        sessionVm.addMessageToSession = addMessageToSession;
        sessionVm.setSelectedMessage = setSelectedMessage;
        sessionVm.updateMessage = updateMessage;
        //</method-assignments>

        //<method-definitions>
        function clearMessageText() {
            sessionVm.messageText = "";
        }

        function addMessageToSession(messageCategory) {
            messagesService
                .addMessageToSession(sessionVm.messageText, messageCategory)
                .then(function (response) {
                    sessionService.updateSession(true);
                });
            clearMessageText();
            $state.reload();
        }

        function messageExistsInView(_message) {
            var found = false;
            switch (_message.category) {
                case "Start":
                    sessionVm.startMessages.forEach(function (message) {
                        if (message.id === _message.id) {
                            found = true;
                        }
                    });
                    break;
                case "Stop":
                    sessionVm.stopMessages.forEach(function (message) {
                        if (message.id === _message.id) {
                            found = true;
                        }
                    });
                    break;
                case "Continue":
                    sessionVm.continueMessages.forEach(function (message) {
                        if (message.id === _message.id) {
                            found = true;
                        }
                    });
                    break;
                default:
                    break;
            }
            return found;
        }

        function setSelectedMessage(message) {
            sessionVm.selectedMessage = message;
        }

        function updateMessage(message) {
            //TODO: Add functionality
        }

        function updateData() {
            messagesService
                .getMessagesByCategory("Start")
                .then(function (response) {
                    response.data.forEach(function (message) {
                        if (message.user.session.sessionID === sessionService.getSessionId() && !messageExistsInView(message)) {
                            sessionVm.startMessages.push(message);
                        }
                    });
                });

            messagesService
                .getMessagesByCategory("Stop")
                .then(function (response) {
                    response.data.forEach(function (message) {
                        if (message.user.session.sessionID === sessionService.getSessionId() && !messageExistsInView(message)) {
                            sessionVm.stopMessages.push(message);
                        }
                    });
                });

            messagesService
                .getMessagesByCategory("Continue")
                .then(function (response) {
                    response.data.forEach(function (message) {
                        if (message.user.session.sessionID === sessionService.getSessionId() && !messageExistsInView(message)) {
                            sessionVm.continueMessages.push(message);
                        }
                    });
                });

            userService
                .getUsersBySessionId(sessionService.getSessionId())
                .then(function (response) {
                    sessionVm.activeUsers = response.data;
                });
            userService.confirmAlive();
        }
        //</method-definitions>

        //<method-calls>
        updateData();
        $interval(updateData, 2000);
        //</method-calls>
    }
})();

