function post(blob) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/test", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send("foo=bar&lorem=ipsum");
}
