var http = require('http');
var fs = require('fs');
var router = require('http-router');

var surveys = [
{"id":1, "name":"survey 1", "description":"survey 1 descrition", "categoryId": 1, "participants": 2},
{"id":2, "name":"survey 2", "description":"survey 2 descrition", "categoryId": 2, "participants": 30},
{"id":3, "name":"survey 3", "description":"survey 3 descrition", "categoryId": 3, "participants": 10}
];

var routes = router.createRouter();

routes.get('/surveys/:id', function(req, res, next){
	surveys.forEach(function(survey){
		if(survey.id.toString() === req.params.id.toString()){
			res.write(JSON.stringify(survey));
		}
	});
})
.get('/surveys', function(req, res, next){
	res.write(JSON.stringify(surveys));
})
.put('/surveys/:id', function(req, res, next){
	var reqcontent = "";
	var id = req.params.id;
	req.on('data', function(data){
		reqcontent += data;
	});

	req.on('end', function(){
		processUpdate();
	});

	function processUpdate(){
		console.log(reqcontent);
		var updatedsurvey = JSON.parse(reqcontent.toString());
		surveys.forEach(function(survey){
			if(survey.id.toString() === id.toString()){
				survey.description = updatedsurvey.description;
			}
		});

	}
})
.delete('/surveys/:id', function(req, res, next){
	console.log("Called!");
	var survey;
	var id = req.params.id;
	for(var i=0; i< surveys.length; ++i){
		survey = surveys[i];
		console.log(survey);
		if(survey.id.toString() === id.toString()){
			console.log('matching found!')
			surveys.splice(i, 1);
		};
	};
});


var server = http.createServer(function(req, res){
  if (!routes.route(req, res)) {
    res.writeHead(501);
    res.end(http.STATUS_CODES[501] + '\n');
  }
  else{
	  	//res.writeHead(200, {'Content-Type':'application/json'})
		res.end();
	}
});

server.listen(process.argv[2]);
