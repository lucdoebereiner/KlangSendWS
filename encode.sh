#ffmpeg -ac 2 -f jack -i ffmpeg_out -f opus -max_delay 0 -flush_packets 1 pipe:1  < /dev/null

ffmpeg -v 0 -ac 2 -f jack -i ffmpeg_out -vn -f s16le - | opusenc --raw --raw-rate 44100 --max-delay 0 - - 'audio/webm;codecs="opus"'
# ffmpeg -v 0 -ac 2 -f jack -i ffmpeg_out -vn -f s16le - | opusenc --raw --raw-rate 44100 --max-delay 0 - -
