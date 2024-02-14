class Shape {
    constructor(name, sides) {
        this.name = name;
        this.sides = sides;
    }
    describe() {
        return `A ${this.name} has ${this.sides} sides.`;
    }
}
class Triangle extends Shape {
    constructor(type) {
        super("Triangle", 3);
        this.type = type;
    }
    describeType() {
        return `This is a ${this.type} triangle.`;
    }
    describe() {
        return `A ${this.name} is a shape with ${this.sides} sides and is a ${this.type} type.`;
    }
    describe(){
        return `A ${this.name} is a shape with ${this.sides} sides and is a ${this.type} type.`;
    }
}

let equilateral = new Triangle("equilateral");
equilateral.sides = 5;
let square = Object.create(equilateral);
square.name = "Square";
square.sides = 4;
square.type = undefined;
console.log(equilateral.describe());
console.log(equilateral.describeType());
console.log(square.describe());
console.log(square.describeType());
equilateral.sides = 5;
console.log(equilateral.describe());
console.log(square.describe());
