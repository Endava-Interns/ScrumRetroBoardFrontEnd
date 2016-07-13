'use strict';

// Declare app level module which depends on views, and components
angular.module('scrum_retroboard', ['ui.router']);

angular
	.module('scrum_retroboard')
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider.state('home', {
			url: '/',
			templateUrl: '/views/home.html',
			controller: 'HomeController',
			controllerAs: 'homeVm'
		});

		$locationProvider.html5Mode(true);
	});
