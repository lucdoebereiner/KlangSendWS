const express = require('express')
const http = require('http')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer({}, app)

const gstreamer = require('gstreamer-superficial')

const pipeline = new gstreamer.Pipeline('jackaudiosrc connect = 1 ! vorbisenc ! oggmux ! appsink max-buffers=0 name=sink')
const clients = []

let headers;

const appsink = pipeline.findChild('sink')

var pull = function(){
  appsink.pull(function(buf, caps) {
    if(caps) {
      console.log("CAPS", caps);
      if(caps.streamheader) headers = caps.streamheader
    }
    if(buf) {
      console.log("BUFFER size", buf.lenght);
      for(c in clients) {
        clients[c].write(buf)
      }
      pull()
    } else {
      setTimeout(pull, 500)
    }
  })
}

pipeline.play()
pull();

pipeline.pollBus( function(msg) {
  switch (msg.type) {
    case 'eos':
        pipeline.stop()
      break;
  }
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/stream.ogg', (req,res) => {
  res.setHeader('Content-Type', 'audio/ogg')
  if(headers) {
    for(let header of headers){
      res.write(header)
    }
    clients.push(res)
  }
  res.on('close', ()=>{
    console.log('client closed');
  })
})

server.listen(port, ()=> console.log('Server started on port ' + port))
