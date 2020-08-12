const WebSocket = require('ws');
const child_process = require("child_process");

const wss = new WebSocket.Server({ port: 3012});

const n_channels = parseInt(process.argv[2]);

var ffmpeg_processes = [];

// // ffmpeg  -loglevel quiet -ac 2 -f jack -i ffmpeg_out -f mp3 -filter:a "volume=-6dB" -max_delay 0 -flush_packets 1 pipe:1

for (let i = 0; i < n_channels; i++) {

    let ffmpeg = child_process.spawn("ffmpeg",[
	"-loglevel", "quiet", "-ac", "2", "-f", "jack", "-i", `ffmpeg_out_${i}`, "-f", "mp3",
	"-max_delay", "0", "-flush_packets", "1", "pipe:1"
    ], {
	stdio: [ 'ignore', 'pipe', 'pipe' ]    
    });

    ffmpeg_processes.push(ffmpeg);
}



ffmpeg_processes.forEach(function (process, process_idx) {

    process.stdout.on('data', function(data) {
	var buffer = data.buffer;
	
	
	wss.clients.forEach(function (client) {
	    
    	    if ((client.readyState === WebSocket.OPEN) && (client.jackChannel == process_idx)) {
    		client.send(buffer);
    	    }
	    
	});
	
    });
    
    
    process.on('close', function (code) {
	console.log('FFmpeg exited with code ' + code);
    });

});


//var clients = [];

// wss.on('message', function incoming(data) {
//     data.channel
// });

// wss.on('connection', function connection(ws) {
//     console.log("New client");
// });


wss.on('connection', function connection(ws) {
        
    ws.on('message', function incoming(data) {
	let parsedData = JSON.parse(data);
	ws.jackChannel = parsedData.channel;
  });

});

// setInterval( () => 
//     wss.clients.forEach(function (client) { console.log(client.jackChannel); })
// , 2000);
			
