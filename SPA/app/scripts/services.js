surveyApp.service('surveys',function($http, $q){
		this.get = function(){
			return $http.get('http://localhost:9000/surveys')
				.then(function(response){
					console.log(response.data);
					console.log('getting executed!')
					return response.data;
				});
		};

		this.getById = function(id){
			return $http.get('http://localhost:9000/surveys/'+ id)
				.then(function(response){
				return response.data;
			});
		};

		this.save = function(changedsurvey){
			if(changedsurvey.id >0){
				$http.put('http://localhost:9000/surveys/' + changedsurvey.id, changedsurvey);
			}
		};

		this.delete = function(survey){
			if(survey.id >0){
				$http.delete('http://localhost:9000/surveys/' + survey.id);
			}
		};
	}
);
