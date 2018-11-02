// Some of this code is adapted from YouTube IFram Player API examples.

function calcSeconds(time) {
  var secs = 0
  var parts = time.split(':')
  secs += parseInt(parts[0]) * 3600
  secs += parseInt(parts[1]) * 60
  secs += parseFloat(parts[2])
  return secs
}

var curClip = false

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script')

tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  console.log('h')
  // Get performance data from MEI file
  /* Setup and send the request */
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'data/example.mei') // <-- change this to the right file
  xhr.send(null)

  /* Deal with the response */
  xhr.onreadystatechange = function () {
    var DONE = 4
    var OK = 200
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        // Get performance data
        var parser = new DOMParser()
        var meiDoc = parser.parseFromString(xhr.responseText,"text/xml")

        var recording = meiDoc.querySelector('performance > recording')
        var avFile = recording.querySelector('avFile[targettype="youtube"]').getAttribute('target')
        var ytId = avFile.split('?v=')[1]
        var clipEls = recording.querySelectorAll('clip')
        var clips = []
        for (i = 0; i < clipEls.length; i++) {
          clips.push({
            begin: calcSeconds(clipEls[i].getAttribute('begin')),
            end: calcSeconds(clipEls[i].getAttribute('end')),
            startid: clipEls[i].getAttribute('startid')
          })
        }

        /* Set up YouTube player */
        if (document.querySelector('#player')) {
          document.querySelector('#player').innerHTML = ''
        }
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: ytId,
          events: {
            'onReady': function(e) {onPlayerReady(e, clips)},
            'onStateChange': function(e) {onPlayerStateChange(e, clips)}
          }
        });
      } else {
        /* Tell us an error happened */
        console.log('Error: ' + xhr.status)
      }
    }
  }
}

// The API will call this function when the video player is ready.
function onPlayerReady(event, clips) {
  for (i = 0; i < clips.length; i++) {
    var clickHandler = function(event, clip) {
      var hl = document.querySelectorAll('.highlighted')
      for (var i = 0; i < hl.length; i++) {
        hl[i].classList.remove('highlighted')
      }
      curClip = clip
      document.querySelector(clip.startid).classList.add('highlighted')
      event.target.seekTo(clip.begin)
      event.target.playVideo();
    }
    if (document.querySelector(clips[i].startid)) {
      document.querySelector(clips[i].startid).addEventListener('click', clickHandler.bind(this, event, clips[i]))
    }
  }
}

//    The API calls this function when the player's state changes.
function onPlayerStateChange(event, clips) {
  onPlayerReady(event, clips) // redundant but needed to refresh click events on score when verovio page changes
  if (event.data == YT.PlayerState.ENDED ||
      event.data == YT.PlayerState.PAUSED) {
        stopVideo()
    // var secs = (curClip.end - curClip.begin) * 1000
    // setTimeout(function () {
    //   if (curClip) {
    //     stopVideo()
    //     document.querySelector(curClip.startid).style.fill = 'black'
    //     curClip = false
    //   }
    // }, secs); // This is the end seconds (difference)
  }
}
function stopVideo() {
  var hl = document.querySelectorAll('.highlighted')
  for (var i = 0; i < hl.length; i++) {
    hl[i].classList.remove('highlighted')
  }
  player.stopVideo();
}
