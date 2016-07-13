'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('scrum_retroboard', ['ui.router', 'uiRouterStyles']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home',{
		url: '/',
		templateUrl: '/views/home.html',
        controller: 'HomeController'
	})
	.state('username', {
		url: '/user',
		templateUrl: 'views/username.html',
		controller: 'UsernameController',
		data: {
			css: 'css/username.css'
		}
	});

});
