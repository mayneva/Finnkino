
function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
  xmlhttp.send();
}

function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table = "<tr><th>Cinema/Theatre</th><th>Film name</th><th>Start time</th><th>Poster</th><th>Genres</th></tr>";
  var x = xmlDoc.getElementsByTagName("Show");
  for (i = 0; i < x.length; i++) {
    table += "<tr><td>" +
      x[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue +
      "</td><td><img src='" +
      x[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue +
      "'/></td><td>" +
      x[i].getElementsByTagName("Genres")[0].childNodes[0].nodeValue +
      "</td></tr>";
  }
  document.getElementById("films").innerHTML = table;
}

var subjectObject = {
  "Espoo": {},
  "Omena, Espoo": {},
  "Sello, Espoo": {},
  "Helsinki": {},
  "Itis, Helsinki": {},
  "Kinopalatsi, Helsinki": {},
  "Maxim, Helsinki": {},
  "Tennispalatsi, Helsinki": {},
  "Flamingo, Vantaa": {},
  "Fantasia, Jyvaskyla": {},
  "Scala, Kuopio": {},
  "Kuvapalatsi, Lahti": {},
  "Strand, Lappeenranta": {},
  "Plaza, Oulu": {},
  "Promenadi, Pori": {},
  "Tampere": {},
  "Cine Atlas, Tampere": {},
  "Plevna, Tampere": {},
  "Kinopalatsi, Turku": {},
}

window.onload = function () {
  var subjectSel = document.getElementById("subject");
  for (var x in subjectObject) {
    subjectSel.options[subjectSel.options.length] = new Option(x, x);
  }
} 
