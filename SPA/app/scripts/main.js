'use strict';

var surveyApp = angular.module('SurveyApp', ['ngRoute'])
  .config(['$routeProvider',function ($routeProvider){
  $routeProvider
    .when('/surveys', {
      templateUrl: 'views/SurveyList.html',
      controller: 'SurveyListcontroller'
    })
    .when('/survey/:id',{
      templateUrl: 'views/Survey.html',
      controller: 'SurveyController'
    })
    .otherwise({
      redirectTo: '/surveys'
    });
}]);
