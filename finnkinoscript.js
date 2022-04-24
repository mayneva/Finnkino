
//Creating an XMLHttpRequest and handling the response

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

// date and time converter, because XML includes non user-friendly data

function convertDate(pastDate) {
  var date = new Date(pastDate);
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  var h = date.getHours();
  var min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y + " " + h + ":" + min;
}

// time converter, , because XML includes non user-friendly data

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + 'h. ' + minutes + 'min.';
}

//table creating with using data from XML

function myFunction(xml, ddlSelection) {
  var i;
  var xmlDoc = xml.responseXML;
  var table = "<tr><th>POSTER</th><th>FILM NAME</th><th>START TIME</th><th>LENGHT</th><th>GENRES</th></tr>";
  var x = xmlDoc.getElementsByTagName("Show");

  //comparing "Theatre" from XML with data from DDL
  for (i = 0; i < x.length; i++) {
    if (x[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue == ddlSelection) {

      table +=
        "<tr><td><img src='" +
        x[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue +
        "'/></td><td>" +
        x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +
        "</td><td>" + convertDate(x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue) + "</td><td>" +
        getTimeFromMins(x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue) + "</td><td>" +
        x[i].getElementsByTagName("Genres")[0].childNodes[0].nodeValue +
        "</td></tr>";
    }
  }

  document.getElementById("films").innerHTML = table;
}

//populate DDL

window.onload = function () {
  var subjectSel = document.getElementById("subject");
  for (var x in subjectObject) {
    subjectSel.options[subjectSel.options.length] = new Option(x, x);
  }
}

//DDL list

var subjectObject = {
  "Omena, Espoo": {},
  "Sello, Espoo": {},
  "Itis, Helsinki": {},
  "Kinopalatsi, Helsinki": {},
  "Maxim, Helsinki": {},
  "Tennispalatsi, Helsinki": {},
  "Flamingo, Vantaa": {},
}