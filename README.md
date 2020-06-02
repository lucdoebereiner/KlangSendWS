# KlangSendWS

This project includes a node.js websocket server that broadcasts audio
(mp3 encoded) from jack (via ffmpeg) to its clients.

## Requirements

- linux system
- jack
- ffmpeg
- npm
- http-server (https://www.npmjs.com/package/http-server)


# Installation

``` shell
$ npm install
```

# Start

- Edit the file `listener.html` and enter your public IP address in
  the line where the websocket server is created.
- Start jack.


``` shell
$ ./start.sh
```

This will boot the websocket server (on port 3012), start ffmpeg and
start and http-server serving your files (on port 8080). Go to
`http://<yourpublicip>:8080/listener.mp3`. Connect input to ffmpeg in
jack. It should now be played back in the browser.

