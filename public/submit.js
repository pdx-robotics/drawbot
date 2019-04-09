function post(blob) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/test", true);
  xhttp.send("foo=bar&lorem=ipsum");
}
