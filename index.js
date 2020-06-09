const WebSocket = require('ws');
const child_process = require("child_process");

const wss = new WebSocket.Server({ port: 3012});

var ffmpeg = child_process.spawn("bash",[
    "/home/luc/Work/klangraum/nodeklang/encode.sh"         
], {
    stdio: [ 'ignore', 'pipe', 'pipe' ]    
});


ffmpeg.stdout.on('data', function(data) {
    var buffer = data.buffer;
    
    wss.clients.forEach(function each(client) {
    	if (client.readyState === WebSocket.OPEN) {
    	    client.send(buffer);
    	}
    });
    
});


ffmpeg.on('close', function (code) {
    console.log('FFmpeg exited with code ' + code);
});

wss.on('connection', function connection(ws) {
    console.log("New client");
});

