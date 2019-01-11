var readline = require('readline');
var events = require('events');
var e = new events.EventEmitter();
const os = require('os');
const path = require('path')
const fs = require('fs')
const chalk = require('chalk');

const inputValueArray = ['help', 'exit', 'man', 'usersList', 'date', 'user info', 'stats']

var cli = {};

cli.init = () => {

	console.log('CLI is running');
	const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'CLI> '
	});

	rl.prompt();
	rl.on('line', (line) => {
		cli.process(line)
		// console.log(line)
		rl.prompt();
	}).on('close', () => {
		console.log("process close");
		process.exit(0);
	});
};

cli.process = (str) => {
 	var  inputstr = typeof str === "string" && str.length > 0 ? str : false
 	var matched = false;
	if(inputstr){
		inputValueArray.some((input) => {
			if(inputstr.toLowerCase().indexOf(input) > -1){
				matched = true;
				e.emit(input, str)
				return true;
			}
		})
	}	
	if(!matched){
			console.log(`${str} is not Define`)
		}
}

e.on('exit', (str) => {
	process.exit(0)
});

e.on('date', (date) => {
	var date2 = new Date();
	var date = date2.getDate();
	var month = date2.getMonth()+ 1;
	var year = date2.getFullYear()

	console.log(`${date}/${month}/${year}, ${date2.getMinutes()}`)
})

e.on('help', (str) => {
	var command = {
		"help": 'This is the helpdesk',
		"man": 'This is Manual',
		"users": 'Showup Users List',
		"stats": 'This is State' 
	}

	cli.horizontalLine = (num) => {
	 console.log(('_').repeat(num))
	}

	cli.verticalLine = (num) => {
	 console.log((' ').repeat(num))
	}

	cli.manualCenter = (string) => {
		var padding = Math.floor((process.stdout.columns - string.length)/2)
		var line = '';
		for(let i = 0; i<= padding; i++){
			line += ' '
		}
		return line + string
	} 

	cli.horizontalLine(process.stdout.columns)
	cli.verticalLine()
	console.log(cli.manualCenter('CLI Manual'))
	cli.horizontalLine(process.stdout.columns)
	var line = '';

	for(var key in command){
		line = key;
		padding = 60 - key.length;
		for(var i=0; i <= padding; i++){
			line += ' '
		}
		line += command[key];
		console.log(line)
	}
})



	const filePath = path.join(__dirname, 'userData')
e.on('usersList', (str) => {


	fs.readdir(filePath, (err, users) => {
		var line = ''
		users.forEach(userdata => {
				line += ' ';
			fs.readFile(filePath + '/' + userdata, (err, data) => {
				// console.log(data)
				if(err){
					console.log(err)
				}else{
					var userInfo = JSON.parse(data)
					line = `Name: ${userInfo.name}, age: ${userInfo.age}, id: ${userInfo.id}`
					console.log(line)
				}
			});

		})

	})	

});

e.on('user info', (str) => {
	var strCopy = str.split('--')
	var user = strCopy[1]
	fs.readFile(filePath + '/' + user + ".json", (err, data) => {
		if(!err){
			var userInfo = JSON.parse(data)
			var userDetails = `Name: ${userInfo.name}, age: ${userInfo.age}, id:${userInfo.id}`
			console.log(userDetails)
		}else{
			console.log("could not read the file" , err)
		}
	})
})



// console.log(process.platform

e.on('stats', (str) => {

	cli.horizontalLine = (num) => {
	 console.log(('_').repeat(num))
	}

	cli.manualCenter = (string) => {
		var padding = Math.floor((process.stdout.columns - string.length)/2)
		var line = '';
		for(let i = 0; i<= padding; i++){
			line += ' '
		}
		return line + string
	} 

	cli.verticalLine = (num) => {
	 console.log((' ').repeat(num))
	}

	cli.manualCenter = (string) => {
		var padding = Math.floor((process.stdout.columns - string.length)/2)
		var line = '';
		for(let i = 0; i<= padding; i++){
			line += ' '
		}
		return line + string
	} 
	cli.horizontalLine(process.stdout.columns)
	cli.verticalLine()
	console.log(cli.manualCenter('CLI STATS'))
	cli.horizontalLine(process.stdout.columns)


	var oscpu = os.cpus();
	var osnetwork  = os.networkInterfaces()
	var plateform = process.platform

	var line = '';
	var osDetails = {
	'CPU-MODEL': oscpu[0].model,
	'OS-NETWORK': osnetwork.lo[0].address,
	'PLATEFORM': plateform
	// console.log(oscpu[0].model, process.platform, osnetwork.lo[0].address)
	}

	line = ''
	for(var key in osDetails){
		line = key;
		padding = 40 - key.length;
		for(var i=0; i <= padding; i++){
			line += ' '
		}
		line += osDetails[key];
		console.log(line)
	}
})


console.log(chalk.blue.bgRed.bold('Hello world!');
module.exports = cli;

// cli.horizontalLine = () => {
// 	for(var line = '='; line.length <= process.stdout.columns ; line+="="){
// 		console.log(i)
// 	}
// }