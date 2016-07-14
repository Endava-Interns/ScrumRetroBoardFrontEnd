(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .config(routes);

    function routes($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/views/home.html',
                controller: 'HomeController',
                controllerAs: 'homeVm'
            })
            .state('user', {
                url: '/user',
                templateUrl: 'views/user.html',
                controller: 'UserController',
                controllerAs: 'userVm'
            })
            .state('session',{
                url: '/session',
                templateUrl: '/views/session.html',
                controller: 'SessionController',
                controllerAs: 'sessionVm'
            });

        $locationProvider.html5Mode(true);
    }
})();