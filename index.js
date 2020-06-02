const WebSocket = require('ws');
const child_process = require("child_process");

const wss = new WebSocket.Server({ port: 3012});

var connections = [];

// var ffmpeg = child_process.spawn("ffmpeg",[
//     "-ac","2",
//     "-f","jack",
//     "-i", "ffmpeg_out",
//     "-c:a", "libopus", "-b:a", "128k",
//     "-f", "opus",
//     "-max_delay", "0",
//     "-flush_packets", "1", 
//     "pipe:1"         
//     ]);


// var ffmpeg = child_process.spawn("ffmpeg",[
//     "-ac","2",
//     "-f","jack",
//     "-i", "ffmpeg_out",
//     "-f", "mp3",
//     "-b:a", "128k",
//     "-max_delay", "0",
//     "-flush_packets", "1", 
//     "pipe:1",
//     "<", "/dev/null"
//     ]);



var ffmpeg = child_process.spawn("bash",[
    "/home/luc/Work/klangraum/nodeklang/encode.sh"         
    ]);




ffmpeg.stderr.on('data', (data)=>{
    let str = new String(data);
    console.error(str);
});

wss.on('connection', function connection(ws) {
  // ws.on('message', function incoming(message) {
  //   console.log('received: %s', message);
  // });
    console.log("connection");

});



ffmpeg.stdout.on('data', function(data) {
    var buffer = data.buffer;

//       console.log(buffer);

    wss.clients.forEach(function each(client) {
	if (client.readyState === WebSocket.OPEN) {
	    client.send(buffer);
	}
    });
 });
