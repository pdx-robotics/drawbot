let testMode = true;
if (testMode) {
    var list = [];
    list.push("a");
    list.push("b");
    list.push("c");
    list.push("d");
    list.push("e");

    var copy = list;
    tailprev = copy[copy.length-2];
    tail = copy[copy.length-1];
    if(tailprev === 'd')
        console.log('pass');
    else
        console.log('fail');
    if(tail === 'e')
        console.log('pass');
    else
        console.log('fail');
    
    post(copy);

    list = [];
    list.push(new Coordinate(0, 0, 0));
    list.push(new Coordinate(1, 0, 0));

    console.log('performing direction tests: ');
    let newDirection = direction(list, { 'x': 1, 'y': 1 });
    if(newDirection == 1)
        console.log('pass');
    else
        console.log('fail');
    list.push(
        new Coordinate(1, 1, newDirection)
    );

    newDirection = direction(list, { 'x': 1, 'y': 2 });
    if(newDirection == 0)
        console.log("pass");
    else
        console.log('fail');
    list.push(
        new Coordinate(1, 2, newDirection)
    );

    newDirection = direction(list, { 'x': 2, 'y': 2 });
    if(newDirection == -1)
        console.log("pass");
    else
        console.log('fail');
    list.push(
        new Coordinate(2, 2, newDirection)
    );

    newDirection = direction(list, { 'x': 1, 'y': 2 });
    if(newDirection == 2)
        console.log("pass");
    else
        console.log('fail');
    list.push(
        new Coordinate(1, 2, newDirection)
    );

    console.log("testing list with directional data");
}
