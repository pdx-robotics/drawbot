var list = new List();
list.append("hello");
list.append("world");
list.display();

var copy = new List(list);
copy.display();

var json = {
  name: 'John'
}
post(json);
