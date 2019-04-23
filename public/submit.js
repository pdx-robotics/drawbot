function post(blob, type) {
  var xhttp = new XMLHttpRequest();
  var string = JSON.stringify( blob );
  console.log(string);
  xhttp.open("POST", type, true);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhttp.send(string);
}
