(function () {
    'use strict';

    angular
        .module('scrum_retroboard')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'homeVm'
                })
                .state('username', {
                    url: '/user',
                    templateUrl: 'views/username.html',
                    controller: 'UsernameController',
                    controllerAs: 'userVm',
                    data: {
                        css: 'css/username.css'
                    }
                });

            $locationProvider.html5Mode(true);
        });
})();