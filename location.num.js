var request = require('request');

request('http://atlas-shared.herokuapp.com/locations.json', function(err, res){	
	if (!err) {
		console.log(JSON.parse(res.body).length);
	} else {
		console.log("error: "+err);
	}

})
