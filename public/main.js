
var dimensions = [34,48]; // default dimensions
var gridSize = 10; // each grid square is this many pixels squared
var doodle = [];
var point = [0, 0]; // pointer on the canvas for directional control
var penOn = true;
var doodleFocus = false;

// ctx refers to the canvas for drawing on
var DOMcanvas = document.getElementById("doodle");
var ctx = DOMcanvas.getContext("2d");

const LEFT = -1;
const RIGHT = 1;
const STRAIGHT = 0;
const OPPOSITE = 2; // rotate 180 degrees

const TILESIZE = 10;
const DOMWidth = document.getElementsByName("width");
const DOMHeight = document.getElementsByName("height");

class Coordinate {
    constructor(x, y, deltaDirection) {
        this.x = x;
        this.y = y;
        this.deltaDirection = deltaDirection;
    }
}

function submit(){
    post(doodle);
}

function setDimensions(){
    dimensions[0] = parseInt(DOMWidth[0].value);
    dimensions[1] = parseInt(DOMHeight[0].value);
    DOMcanvas.width = dimensions[0] * TILESIZE;
    DOMcanvas.height = dimensions[1] * TILESIZE;
    ctx.clearRect(0, 0, DOMcanvas.width, DOMcanvas.height);
    drawGrid(ctx, dimensions[0] * gridSize, dimensions[1] * gridSize);
    _setOrigin(0,0); // reset the pointer to the upper left corner.
}

function setOrigin(){
    let x = parseInt(document.getElementsByName("x")[0].value);
    let y = parseInt(document.getElementsByName("y")[0].value);
    try{
        _setOrigin(x,y);
    }
    catch(err){
        console.log(err);
    }
}
function _setOrigin(x, y){
    if( isNaN(x) || isNaN(y) )
        throw "Not a number";
    if( x < 0 || x > dimensions[0] || y < 0 || y > dimensions[1])
        throw "Out of bounds";
    point[0] = x * TILESIZE;
    point[1] = y * TILESIZE;    
}

// checks what direction the bot needs to go next
function direction(list, next){
    let tail = list[list.length-1];
    let tailprev = list[list.length-2];
    let deltaX = tail.x - tailprev.x;
    let deltaY = tail.y - tailprev.y;
    if( Math.abs(next.x - tailprev.x) == 2 || Math.abs(next.y - tailprev.y) == 2)
        return STRAIGHT;
    if(next.x - tailprev.x == 0 && next.y - tailprev.y == 0)
        return OPPOSITE;
    if(deltaX == 1){
        if(next.y - tail.y == 1)
            return RIGHT;
        else
            return LEFT;
    }
    if(deltaX == -1){
        if(next.y - tail.y == 1)
            return LEFT;
        else
            return RIGHT;
    }
    if(deltaY == 1){
        if(next.x - tail.x == 1)
            return LEFT;
        else
            return RIGHT;
    }
    if(deltaY == -1){
        if(next.x - tail.x == 1)
            return RIGHT;
        else
            return LEFT;
    }
}

function setPen() {
    if (penOn === true) {
        penOn = false;
        document.getElementById("penButton").innerHTML = "Marker off";
    }
    else {
        penOn = true;
        document.getElementById("penButton").innerHTML = "Marker on";
    }
}

function draw(canvas, x, y) {
    if (!penOn) {
        canvas.strokeStyle = "red";
        canvas.setLineDash([1, 2]);
    }
    else {
        canvas.strokeStyle = "black";
        canvas.setLineDash([]);
    }
    canvas.beginPath();
    canvas.moveTo(point[0], point[1]); // start of line
    let temp = [point[0] + x * gridSize, point[1] + y * gridSize];
    if (
    temp[0] <= dimensions[0] * gridSize &&
    temp[1] <= dimensions[1] * gridSize &&
    temp[0] >= 0 && temp[1] >= 0) 
    {
        point = temp;
        canvas.lineTo(point[0], point[1]); // end of line
        canvas.stroke();
    }
}

function drawGrid(canvas, width, height) {
    canvas.strokeStyle = "#C1C1C1"; // light grey
    canvas.beginPath();
    // horizontal lines
    for (let i = 0; i <= height / TILESIZE; ++i) {
        canvas.moveTo(0, i * TILESIZE);
        canvas.lineTo(width, i * TILESIZE);
        canvas.stroke();
    }
    // vertical lines
    for (let i = 0; i <= width / TILESIZE; ++i) {
        canvas.moveTo(i * TILESIZE, 0);
        canvas.lineTo(i * TILESIZE, height);
        canvas.stroke();
    }
}

function doodleAppend(x,y){
    if(doodle.length == 0){
        doodle.push(new Coordinate(x, y, STRAIGHT));
    }
    else if(doodle.length == 1){
        doodle.push(new Coordinate(x, y, STRAIGHT));
    }
    else
        doodle.push(new Coordinate(x, y, direction(doodle, {'x': x, 'y': y})));
}

DOMcanvas.addEventListener("mouseenter", function(){
    doodleFocus = true;
});
DOMcanvas.addEventListener("mouseleave", function(){
    doodleFocus = false;
});

function checkKey(e) {
    if(doodleFocus === false)
        return;

    if (e.keyCode == '38') {
        // up arrow
        draw(ctx, 0, -1);
        doodleAppend(point[0] / TILESIZE, point[1] / TILESIZE);
    }
    else if (e.keyCode == '40') {
        // down arrow
        draw(ctx, 0, 1);
        doodleAppend(point[0] / TILESIZE, point[1] / TILESIZE);
    }
    else if (e.keyCode == '37') {
        // left arrow
        draw(ctx, -1, 0);
        doodleAppend(point[0] / TILESIZE, point[1] / TILESIZE);
    }
    else if (e.keyCode == '39') {
        // right arrow
        draw(ctx, 1, 0);
        doodleAppend(point[0] / TILESIZE, point[1] / TILESIZE);
    }

}

// start of gamepad coding.
var rAF = window.requestAnimationFrame;
var gamepad;
var pad = document.getElementById('pad');
window.addEventListener("gamepadconnected", function(e){
    gamepad = e.gamepad;
    console.log(gamepad);
    gameloop();
});

function gameloop(){
    let gp = navigator.getGamepads()[0];
    pad.innerHTML = gp.axes[1].toFixed(3) + " " + gp.axes[2].toFixed(3);
    rAF(gameloop);
}
// end of gamepad coding.

drawGrid(ctx, dimensions[0] * gridSize, dimensions[1] * gridSize);
document.onkeydown = checkKey;
