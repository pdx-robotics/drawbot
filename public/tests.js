let testMode = false;
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
    console.log(copy.tailprev);
    console.log(copy.tail);
    post(copy);

    list = new List()
    list.append(new Coordinate(0, 0, 0));
    list.append(new Coordinate(1, 0, 0));

    let newDirection = direction(list, { 'x': 1, 'y': 1 });
    console.log(newDirection);
    list.append(
        new Coordinate(1, 1, newDirection)
    );

    newDirection = direction(list, { 'x': 1, 'y': 2 });
    console.log(newDirection);
    list.append(
        new Coordinate(1, 2, newDirection)
    );

    newDirection = direction(list, { 'x': 2, 'y': 2 });
    console.log(newDirection);
    list.append(
        new Coordinate(2, 2, newDirection)
    );

    newDirection = direction(list, { 'x': 1, 'y': 2 });
    console.log(newDirection);
    list.append(
        new Coordinate(1, 2, newDirection)
    );

    list.display();
}
