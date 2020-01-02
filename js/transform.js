document.getElementById('file').onchange = function(){
  var x = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    console.log(this.result);

    var lines = this.result.split('\n');
    for (var line = 0; line < syllables.length; line++){
      console.log(lines[line]);
    }
  };
  reader.readAsText(x);
};


/*function getText() {
  document.getElementById('file').onchange = function parseMyText(){
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function (progressEvent){

      var lines = this.result.split('\n');
      for(var line = 0; line < lines.length; line ++) {
        console.log(lines[line]);
      }
    };
  }
}


var meiDoc = new XMLHttpRequest();
var textInput = document.getElementById('fileUpload');
var file = input.files[0];
var reader = new FileReader();

meiDoc.open("GET", "", true);
meiDoc.onreadystatechange = function () {
  if (meiDoc.readyState == 4 && meiDoc.status == 200)
  {

    txtDoc.open("GET", "", true);
    txtDoc.onreadystatechange = function () {

      var lyric =
      var lyric = meiDoc.getElementById('verse-001');
      lyric.innerHTML += ''
    }

  }
}*/
