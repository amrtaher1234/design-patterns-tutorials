// Here we consider our House to be the product.  Our house is a complex
// Object that requires lots of members to be intialized. We create a seperate Builder class that implements an interface for builders
// and make it build each member of our (Product/House) class in a seperate function.
// A director class could be used to choose the right builder and pre-define building steps.

class House {
  // defining the members needed to build the product
  doors: Number;
  windows: Number;
  garden: Boolean;
  roof: Boolean;
  constructor() {}
  buildHouse() {
    console.log("Building Started....");
    console.log("doors are", this.doors);
    console.log("windows are", this.windows);
    console.log("garden is", this.garden);
    console.log("roof is", this.roof);
    console.log("Building Finished....");
  }
}

interface Builder {
  house: House;
  build(): House;
  setDoors(doors: Number);
  setWindows(windows: Number);
  setGarden(garden: Boolean);
  setRoof(roof: Boolean);
  reset();
}

class HouseBuilderA implements Builder {
  house: House;
  constructor() {
    // initiates the product
    this.house = new House();
  }
  setDoors(doors) {
    // door complex logic
    this.house.doors = doors;
  }
  setWindows(windows) {
    this.house.windows = windows;
  }
  setGarden(garden) {
    this.house.garden = garden;
  }
  setRoof(roof) {
    this.house.roof = roof;
  }
  build(): House {
    // always copying the product the then resetting it after
    const houseTemp = this.house;
    this.reset();
    return houseTemp;
  }
  reset() {
    this.house = new House();
  }
}

// this class could be omitted if needed, it is useful to create a layer between creating builders and choosing
// which builder to use. also you can pre-define your building process in functions over here.
class Director {
  builder: Builder;
  setBuilder(builder: Builder) {
    this.builder = builder;
  }
  builderNormalHouse() {
    this.builder.setDoors(1);
    this.builder.setWindows(1);
    this.builder.setGarden(false);
    this.builder.setRoof(false);
  }
  buildLuxuryHouse() {
    this.builder.setDoors(100);
    this.builder.setWindows(100);
    this.builder.setGarden(true);
    this.builder.setRoof(true);
  }
}
function main() {
  const houseBuilder = new HouseBuilderA();
  const director = new Director();
  director.setBuilder(houseBuilder);
  director.buildLuxuryHouse();

  const luxuryHouse = houseBuilder.build();

  director.builderNormalHouse();

  const normalHouse = houseBuilder.build();

  luxuryHouse.buildHouse();
  normalHouse.buildHouse();
}

main();
