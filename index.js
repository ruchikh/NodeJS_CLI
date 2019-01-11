
// Dependencies

var server = require('./server');
var cli = require('./cli');

const app ={};

app.init = () => {
	
	//Initialize server

	server.init();

	//Initialize CLI after some time

	setTimeout(() => {
		cli.init();
	}, 50);

	
}

// Self executing
app.init();
