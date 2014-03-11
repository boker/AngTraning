'use strict';

surveyApp.controller('SurveyListcontroller', function ($scope, surveys) {
	    surveys.get().then(function(data){
	    	$scope.surveys  = data;
	    });

	    $scope.delete = function(index){
	      surveys.delete($scope.surveys[index]);
	      console.log($scope.surveys.splice(index,1));
	    }
});

surveyApp.controller('SurveyController', function($scope, $routeParams, $location, surveys){
	var surveyId = +$routeParams.id ;
	
	surveys.getById(surveyId)
		.then(function(survey){
			console.log(survey);
			$scope.survey = survey;
		});			
	
	$scope.categories = [
		{id:1, name:"eMail Based"},
		{id:2, name:"Online"},
		{id:3, name:"SMS Based"}
	];

	$scope.save = function(){
		surveys.save($scope.survey);
		$location.path('/surveys');
	}

	$scope.cancel = function(){
		$location.path('/surveys');
	}
})
