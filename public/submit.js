function post() {
  var xhttp = new XMLHttpRequest();
  var string = JSON.stringify( {foo : "bar"} );
  xhttp.open("POST", "/test", true);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhttp.send(string);
  console.log(string);
}
