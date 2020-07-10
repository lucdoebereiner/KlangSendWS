ffmpeg  -loglevel quiet -ac 2 -f jack -i ffmpeg_out -f webm -c:a libvorbis -b:a 128k  -ar 44100  -max_delay 0 -flush_packets 1 pipe:1  < /dev/null

# gst-launch-1.0 jackaudiosrc ! audioconvert ! opusenc ! webmmux ! filesink location=/dev/stdout


# ffmpeg  -loglevel quiet -ac 2 -f jack -i ffmpeg_out -f mp3 -filter:a "volume=-6dB" -max_delay 0 -flush_packets 1 pipe:1  < /dev/null


#ffmpeg  -loglevel quiet -ac 2 -f jack -i ffmpeg_out -f webm_chunk -audio_chunk_duration 1000  -c:a libopus -b:a 92k -filter:a "volume=-6dB" -max_delay 0 -flush_packets 1 pipe:1  < /dev/null

# ffmpeg  -loglevel quiet -ac 2 -f jack -i ffmpeg_out -f webm -c:a libopus -b:a 92k -filter:a "volume=-6dB" -max_delay 0 -flush_packets 1 pipe:1  < /dev/null

# ffmpeg -loglevel quiet -ac 2 -f jack -i ffmpeg_out -f webm -c:a opus -strict -2 -b:a 92k -filter:a "volume=-6dB" -max_delay 0 -flush_packets 1 pipe:1  < /dev/null


# ffmpeg -ac 2 -f jack -i ffmpeg_out -f webm -c:a libopus -b:a 32k -filter:a "volume=-6dB" -max_delay 0 -flush_packets 1 pipe:1  < /dev/null


# ffmpeg -ac 2 -f jack -i ffmpeg_out -f webm -c:a libopus -b:a 64k -filter:a "volume=-12dB" pipe:1  < /dev/null


# (ffmpeg -v 0 -ac 2 -f jack -i ffmpeg_out -vn -f s16le -max_delay 0 -flush_packets 1 - | opusenc --raw --raw-rate 44100 --max-delay 0 - -) 
