const child_process = require("child_process");

var ffmpeg = child_process.spawn("bash",[
    "encode.sh"         
], {
    stdio: [ 'ignore', 'pipe', 'pipe' ]    
});


ffmpeg.stdout.on('data', function(data) {
    const buffer = data.buffer;
    const view = new Uint8Array(buffer);
    
    console.log(view.toString());
    console.log('\n\n');
    
});


ffmpeg.on('close', function (code) {
    console.log('FFmpeg exited with code ' + code);
});


