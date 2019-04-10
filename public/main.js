
var dimensions = [34,48];
var gridSize = 10;
var doodle = new List();
var point = [0, 0]; //pointer on the canvas for directional control
var penOn = true;

const LEFT = -1;
const RIGHT = 1;
const STRAIGHT = 0;
const OPPOSITE = 2;
class Coordinate {
    constructor(x, y, deltaDirection) {
        this.x = x;
        this.y = y;
        this.deltaDirection = deltaDirection;
    }
}

// checks what direction the bot needs to go next
function direction(list, next){
    let deltaX = list.tail.data.x - list.tailprev.data.x;
    let deltaY = list.tail.data.y - list.tailprev.data.y;
    if(next.x - list.tailprev.data.x == 2 || next.y - list.tailprev.data.y == 2)
        return STRAIGHT;
    if(next.x - list.tailprev.data.x == 0 && next.y - list.tailprev.data.y == 0)
        return OPPOSITE;
    if(deltaX == 1){
        if(next.y - list.tail.data.y == 1)
            return RIGHT;
        else
            return LEFT;
    }
    if(deltaX == -1){
        if(next.y - list.tail.data.y == 1)
            return LEFT;
        else
            return RIGHT;
    }
    if(deltaY == 1){
        if(next.x - list.tail.data.x == 1)
            return LEFT;
        else
            return RIGHT;
    }
    if(deltaY == -1){
        if(next.x - list.tail.data.x == 1)
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
    canvas.strokeStyle = "#C1C1C1";
    canvas.beginPath();
    //horizontal lines
    for (let i = 0; i <= height / 10; ++i) {
        canvas.moveTo(0, i * 10);
        canvas.lineTo(width, i * 10);
        canvas.stroke();
    }
    //vertical lines
    for (let i = 0; i <= width / 10; ++i) {
        canvas.moveTo(i * 10, 0);
        canvas.lineTo(i * 10, height);
        canvas.stroke();
    }
}
var ctx = document.getElementById("doodle").getContext("2d");
drawGrid(ctx, dimensions[0] * gridSize, dimensions[1] * gridSize);
document.onkeydown = checkKey;

function checkKey(e) {

    if (e.keyCode == '38') {
        // up arrow
        draw(ctx, 0, -1);
    }
    else if (e.keyCode == '40') {
        // down arrow
        draw(ctx, 0, 1);
    }
    else if (e.keyCode == '37') {
        // left arrow
        draw(ctx, -1, 0);
    }
    else if (e.keyCode == '39') {
        // right arrow
        draw(ctx, 1, 0);
    }

}
