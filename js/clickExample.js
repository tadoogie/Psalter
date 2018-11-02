function registerClick(listOfIds) {
  for (var i=0; i < listOfIds.length; i++) {
    document.querySelector('#'+listOfIds[i]).addEventListener('click', function () {
      // DO SOMETHING ON EACH CLICK
    })
  }
}
