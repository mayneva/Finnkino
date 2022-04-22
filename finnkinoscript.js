
function loadXMLDoc(ddlSelection) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this, ddlSelection);
    }
  };
  xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
  xmlhttp.send();
}

function myFunction(xml, ddlSelection) {
  var i;
  var xmlDoc = xml.responseXML;
  var table = "<tr><th>POSTER</th><th>FILM NAME</th><th>START TIME</th><th>LENGHT</th><th>GENRES</th></tr>";
  var x = xmlDoc.getElementsByTagName("Show");

  for (i = 0; i < x.length; i++) {
    if (x[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue == ddlSelection) {

      table +=
        "<tr><td><img src='" +
        x[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue +
        "'/></td><td>" +
        x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("Genres")[0].childNodes[0].nodeValue +
        "</td></tr>";
    }
  }

  document.getElementById("films").innerHTML = table;
}


window.onload = function () {
  var subjectSel = document.getElementById("subject");
  for (var x in subjectObject) {
    subjectSel.options[subjectSel.options.length] = new Option(x, x);
  }
}


var subjectObject = {
  "Omena, Espoo": {},
  "Sello, Espoo": {},
  "Itis, Helsinki": {},
  "Kinopalatsi, Helsinki": {},
  "Maxim, Helsinki": {},
  "Tennispalatsi, Helsinki": {},
  "Flamingo, Vantaa": {},
}