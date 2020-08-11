# KlangSendWS

This project includes a node.js websocket server that broadcasts audio
(vorbis encoded) from jack (via ffmpeg) to its clients. It has been
tested with Chrome and Firefox.

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

- Start jack.


``` shell
$ ./start.sh
```

This will boot the websocket server (on port 3012), start ffmpeg and
start and http-server serving your files (on port 8080). Go to
`http://<yourpublicip>:8080/listener.html?server=<ip>&channel=<jack
channel>` (for example
`http://localhost:8080/listener.html?server=localhost&channel=0`). Connect
input to ffmpeg in jack. It should now be played back in the browser.


# TODO

- Deal with pause
- Limit length of queue before first playback
- Reconnection
