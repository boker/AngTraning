var http = require('http');
var fs = require('fs');
var router = require('http-router');

var surveys = [
{"id":1, "name":"survey 1", "description":"survey 1 descrition", "categoryId": 1, "participants": 2},
{"id":2, "name":"survey 2", "description":"survey 2 descrition", "categoryId": 2, "participants": 30},
{"id":3, "name":"survey 3", "description":"survey 3 descrition", "categoryId": 3, "participants": 10}
];

var routes = router.createRouter();

function appendOKHeaders(res){
	res.writeHead(
	    "200",
	    "OK",
	    {
	    	'Content-Type':'application/json',
	        "access-control-allow-origin": "*",
	        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
	        "access-control-allow-headers": "content-type, accept",
	        "access-control-max-age": 10//, // Seconds.
	        //"content-length": 0
	    }
	);

};

routes
.get('/surveys/:id', function(req, res, next){
	appendOKHeaders(res);
	surveys.forEach(function(survey){
		if(survey.id.toString() === req.params.id.toString()){
			res.write(JSON.stringify(survey));
		}
	});
})
.get('/surveys', function(req, res, next){
	appendOKHeaders(res);
	res.write(JSON.stringify(surveys));
})
.put('/surveys/:id', function(req, res, next){
	appendOKHeaders(res);
	var reqcontent = "";
	var id = req.params.id;
	req.on('data', function(data){
		reqcontent += data;
	});

	req.on('end', function(){
		processUpdate();
	});

	function processUpdate(){
		var updatedsurvey = JSON.parse(reqcontent.toString());
		surveys.forEach(function(survey){
			if(survey.id.toString() === id.toString()){
				survey.description = updatedsurvey.description;
				survey.categoryId = updatedsurvey.categoryId;
				survey.participants = updatedsurvey.participants;
			}
		});

	}
})
.delete('/surveys/:id', function(req, res, next){
	var survey;
	var id = req.params.id;
	appendOKHeaders(res);
	for(var i=0; i< surveys.length; ++i){
		survey = surveys[i];
		console.log(survey);
		if(survey.id.toString() === id.toString()){
			surveys.splice(i, 1);
		};
	};
});


var server = http.createServer(function(req, res){
    // When dealing with CORS (Cross-Origin Resource Sharing)
    // requests, the client should pass-through its origin (the
    // requesting domain). We should either echo that or use *
    // if the origin was not passed.
    var origin = (req.headers.origin || "*");


    // Check to see if this is a security check by the browser to
    // test the availability of the API for the client. If the
    // method is OPTIONS, the browser is check to see to see what
    // HTTP methods (and properties) have been granted to the
    // client.
    console.log(req.method.toUpperCase());
    if (req.method.toUpperCase() === "OPTIONS"){


        // Echo back the Origin (calling domain) so that the
        // client is granted access to make subsequent requests
        // to the API.
        res.writeHead(
            "204",
            "No Content",
            {
                "access-control-allow-origin": origin,
                "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-headers": "content-type, accept",
                "access-control-max-age": 10, // Seconds.
                "content-length": 0
            }
        );

        // End the response - we're not sending back any content.
        return( res.end() );


    }
    
	  if (!routes.route(req, res)) {
	    res.writeHead(501);
	    res.end(http.STATUS_CODES[501] + '\n');
	  }
	  else{
			res.end();
		}
	
});

server.listen(process.argv[2]);
