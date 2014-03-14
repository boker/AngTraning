'use strict';

//var surveyApp = angular.module('SurveyApp', ['ngRoute']);

/*
surveyApp.config(function ($routeProvider, $httpProvider){
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

    //  $httpProvider.interceptors.push('myHttpInterceptor');
});
*/

/*
surveyApp.factory('myHttpInterceptor', function($q){
    return {
      'request' : function(config){
        console.log('request interception happening!');
        if(config){
          config.headers.testHeader = "This is a test header value.";
        }

        return config || $q.when(config);
      }
    };
});

*/