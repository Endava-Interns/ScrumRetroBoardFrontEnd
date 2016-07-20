(function () {
    "use strict";

    angular
        .module("scrum_retroboard")
        .controller("SessionController", [
            "$scope",
            "$location",
            "$state",
            "$http",
            "$interval",
            "messagesService",
            "userService",
            "sessionService",
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
        sessionVm.newMessageContent = "";
        //</scope-models>

        //<method-assignments>
        sessionVm.allowMessageEditing = allowMessageEditing;
        sessionVm.clearMessageText = clearMessageText;
        sessionVm.addMessageToSession = addMessageToSession;
        sessionVm.setSelectedMessage = setSelectedMessage;
        sessionVm.updateMessage = updateMessage;
        //</method-assignments>

        //<method-definitions>
        function allowMessageEditing() {
            //TODO: Temporary workaround, find fix for problem (20.07.2016)
            if (sessionVm.selectedMessage !== null) {
                return sessionVm.selectedMessage.user.id !== userService.getUserId();
            }
            return true;
        }

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
            updateData();
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
            sessionVm.newMessageContent = message.content;
        }

        function updateMessage(message) {
            messagesService
                .updateMessage(sessionVm.newMessageContent, message.id)
                .then(function () {
                    messagesService
                        .getMessagesByCategory(message.category)
                        .then(function (response) {
                            switch (message.category) {
                                case "Start":
                                    sessionVm.startMessages = [];
                                    break;
                                case "Stop":
                                    sessionVm.stopMessages = [];
                                    break;
                                case "Continue":
                                    sessionVm.continueMessages = [];
                                    break;
                            }
                            response.data.forEach(function (message) {
                                if (message.user.session.sessionID === sessionService.getSessionId() && !messageExistsInView(message)) {
                                    switch (message.category) {
                                        case "Start":
                                            sessionVm.startMessages.push(message);
                                            break;
                                        case "Stop":
                                            sessionVm.stopMessages.push(message);
                                            break;
                                        case "Continue":
                                            sessionVm.continueMessages.push(message);
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            });
                        });
                });
        }

        function updateData() {
            messagesService
                .getMessagesByCategory("Start")
                .then(function (response) {
                    sessionVm.startMessages = [];
                    response.data.forEach(function (message) {
                        if (message.user.session.sessionID === sessionService.getSessionId() && !messageExistsInView(message)) {
                            sessionVm.startMessages.push(message);
                        }
                    });
                });

            messagesService
                .getMessagesByCategory("Stop")
                .then(function (response) {
                    sessionVm.stopMessages = [];
                    response.data.forEach(function (message) {
                        if (message.user.session.sessionID === sessionService.getSessionId() && !messageExistsInView(message)) {
                            sessionVm.stopMessages.push(message);
                        }
                    });
                });

            messagesService
                .getMessagesByCategory("Continue")
                .then(function (response) {
                    sessionVm.continueMessages = [];
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
} ());

