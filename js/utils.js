function showScore(id, path) {
  page = 1
  /* Setup and send the request */
  var xhr = new XMLHttpRequest()
  xhr.open('GET', path)
  xhr.send(null)

  /* Deal with the response */
  xhr.onreadystatechange = function () {
    var DONE = 4
    var OK = 200
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        /* Pass the MEI data to Verovio */
        var svg = vrvToolkit.renderData(xhr.responseText, {})

        /* Place Verovio's output on the page */
        document.getElementById(id).innerHTML = svg
        // document.querySelector('#d414233e38').style.fill = "Blue"
      } else {
        /* Tell us an error happened */
        console.log('Error: ' + xhr.status)
      }
    }
  }

  // Set up buttons
  document.querySelector("#next").addEventListener('click', function() {
    if (page < vrvToolkit.getPageCount()) {
      page++
      var svg = vrvToolkit.renderPage(page)
      document.getElementById(id).innerHTML = svg
    }
    if (player) {
      player.stopVideo();
    }
  })
  document.querySelector("#prev").addEventListener('click', function() {
    if (page > 1) {
      page--
      var svg = vrvToolkit.renderPage(page)
      document.getElementById(id).innerHTML = svg
    }
    if (player) {
      player.stopVideo();
    }
  })
}
