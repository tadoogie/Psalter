
// Get performance data from MEI file
/* Setup and send the request */
var xhr = new XMLHttpRequest()
xhr.open('GET', 'data/example2.mei') // <-- change this to the right file
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
      var clipEls = recording.querySelectorAll('clip')
      var clips = []
      for (i = 0; i < clipEls.length; i++) {
        clips.push({
          startid: clipEls[i].getAttribute('startid'),
          file: clipEls[i].querySelector('avFile').getAttribute('target')
        })
      }

      // Create click events
      var audios = []
      for (i = 0; i < clips.length; i++) {
        var clickHandler = function(clip) {
          var hl = document.querySelectorAll('.highlighted')
          for (var i = 0; i < hl.length; i++) {
            hl[i].classList.remove('highlighted')
          }
          curClip = clip
          document.querySelector(clip.startid).classList.add('highlighted')
          // Play audio
          var audio = new Audio('data/'+clip.file)
          audio.play()
          audios.push(audio)
          document.querySelector('#stop').addEventListener('click', function() {
            for (j=0; j<audios.length; j++) {
              console.log(audios[j])
              audios[j].pause()
              // audios[j] = null
            }
          })
        }
        document.querySelector(clips[i].startid).addEventListener('click', clickHandler.bind(this, clips[i]))
      }

    } else {
      /* Tell us an error happened */
      console.log('Error: ' + xhr.status)
    }
  }
}

//   }
// }
//
// // The API will call this function when the video player is ready.
// function onPlayerReady(event, clips) {
//   for (i = 0; i < clips.length; i++) {
//     var clickHandler = function(event, clip) {
//       var hl = document.querySelectorAll('.highlighted')
//       for (var i = 0; i < hl.length; i++) {
//         hl[i].classList.remove('highlighted')
//       }
//       curClip = clip
//       document.querySelector(clip.startid).classList.add('highlighted')
//       event.target.seekTo(clip.begin)
//       event.target.playVideo();
//     }
//     document.querySelector(clips[i].startid).addEventListener('click', clickHandler.bind(this, event, clips[i]))
//   }
// }
//
// //    The API calls this function when the player's state changes.
// function onPlayerStateChange(event, clips) {
//   if (event.data == YT.PlayerState.ENDED ||
//       event.data == YT.PlayerState.PAUSED) {
//         stopVideo()
//     // var secs = (curClip.end - curClip.begin) * 1000
//     // setTimeout(function () {
//     //   if (curClip) {
//     //     stopVideo()
//     //     document.querySelector(curClip.startid).style.fill = 'black'
//     //     curClip = false
//     //   }
//     // }, secs); // This is the end seconds (difference)
//   }
// }
// function stopVideo() {
//   var hl = document.querySelectorAll('.highlighted')
//   for (var i = 0; i < hl.length; i++) {
//     hl[i].classList.remove('highlighted')
//   }
//   player.stopVideo();
// }
