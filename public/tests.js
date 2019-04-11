let testMode = true;
if (testMode) {
    var list = new List();
    list.append("a");
    list.append("b");
    list.append("c");
    list.append("d");
    list.append("e");
    list.display();

    var copy = new List(list);
    copy.display();
    if(copy.tailprev.data === 'd')
        console.log('pass');
    else
        console.log('fail');
    if(copy.tail.data === 'e')
        console.log('pass');
    else
        console.log('fail');
    
    post(copy);

    list = new List();
    list.append(new Coordinate(0, 0, 0));
    list.append(new Coordinate(1, 0, 0));

    console.log('performing direction tests: ');
    let newDirection = direction(list, { 'x': 1, 'y': 1 });
    if(newDirection == 1)
        console.log('pass');
    else
        console.log('fail');
    list.append(
        new Coordinate(1, 1, newDirection)
    );

    newDirection = direction(list, { 'x': 1, 'y': 2 });
    if(newDirection == 0)
        console.log("pass");
    else
        console.log('fail');
    list.append(
        new Coordinate(1, 2, newDirection)
    );

    newDirection = direction(list, { 'x': 2, 'y': 2 });
    if(newDirection == -1)
        console.log("pass");
    else
        console.log('fail');
    list.append(
        new Coordinate(2, 2, newDirection)
    );

    newDirection = direction(list, { 'x': 1, 'y': 2 });
    if(newDirection == 2)
        console.log("pass");
    else
        console.log('fail');
    list.append(
        new Coordinate(1, 2, newDirection)
    );

    console.log("testing list with directional data");
    list.display();
}
