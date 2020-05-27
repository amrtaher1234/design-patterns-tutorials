interface Observer {
  update(state: any);
}
interface Observable {
  observers: Observer[];
  notify(): void;
  add(observer: Observer);
  remove(observer: Observer);
}

class User implements Observer {
  name: string;
  constructor(name) {
    this.name = name;
  }
  update(state: any) {
    this.sendEmail(state);
  }
  sendEmail(state) {
    console.log("user ", this.name, state, "state from observer");
    // send email to user email contianing product updates.
  }
}

class Iphone implements Observable {
  observers: Observer[];
  availble; // state
  constructor() {
    this.availble = false;
    this.observers = [];
  }
  add(observer: Observer) {
    this.observers.push(observer);
  }
  notify() {
    this.observers.forEach((observer) => {
      observer.update(this.availble);
    });
  }
  remove(observer: Observer) {}
  addToAvailableLists() {
    this.availble = true;
    this.notify();
  }
  changeStateRandomly() {
    this.availble = Math.ceil(Math.random() * 100);
    this.notify();
  }
}

function main() {
  var phone = new Iphone();
  var ahmed = new User("ahmed");
  var ibrhaim = new User("ibrahim ");
  var sara = new User("sara");

  phone.add(ahmed);
  phone.add(ibrhaim);

  // some kind of event
  phone.addToAvailableLists();

  phone.changeStateRandomly();
  phone.changeStateRandomly();
  phone.changeStateRandomly();
  phone.changeStateRandomly();
  phone.changeStateRandomly();
  phone.changeStateRandomly();
}
