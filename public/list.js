class Node {
    constructor(data, next){
        this.data = data;
        this.next = next;
    }
}

class List {
    constructor(blob){
        // copy constructor
        if(blob != undefined){
            this.head = blob.head; 
            while(blob.head){
                this.append(blob.head.data);
                blob.head = blob.head.next;
            }
        }
        // default
        else{
            this.head = null;
            this.tail = null;
        }
    }

    append(data){
        if(this.tail){
            this.tail.next = new Node(data, null);
            this.tail = this.tail.next;
        }
        else{
            this.tail = new Node(data, null);
            this.head = this.tail;
        }
    }
    
    prepend(data){
        temp = this.head;
        this.head = new Node(data, temp);
    }

    display(){
        let temp = this.head;
        while(temp){
            console.log(temp.data);
            temp = temp.next;
        }
    }
}
