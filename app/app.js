'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('scrum_retroboard', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home',{
		url: '/',
		templateUrl: '/views/home.html',
        controller: 'HomeController'
	});


});
