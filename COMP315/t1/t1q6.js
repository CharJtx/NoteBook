
// Q6
class Bag {
    constructor() {
        this.elements = new Map;
    }

    add(element) {
        this.elements.set(element, (this.elements.get(element) || 0) + 1);
    }

    remove(element) {
        if (this.elements.has(element)) {
            if (this.elements.get(element) > 1) {
                this.elements.set(element, this.elements.get(element) - 1);
            }
            else {
                this.elements.delete(element)
            }
        }
    }

    count(element) {
        if (this.elements.has(element)) {
            return this.elements.get(element);
        }
    }

    size() {
        let size = 0;
        for (let count of this.elements.values()) {
            size = size + count
        }
        return size;
    }

}

const bag = new Bag();
bag.add('apple');
bag.add('banana');
bag.add('apple');
console.log(bag.count('apple'));
console.log(bag.size());
bag.remove('apple');
console.log(bag.count('apple'));
console.log(bag.size());

// Q7
var json = '{"name":"John", "age":"30", "city":"New York"}'
var setList = json.slice(1, -1).split(',')
var resultLsit = {}
for (let keyValue of setList) {
    let tmp = keyValue.split(':')
    let key = tmp[0].slice(1, -1)
    let values = tmp[1].slice(1, -1)
    resultLsit[key] = values
}
console.log(resultLsit)

//Q8
let students = [
    { name: "John", grade: 90 },
    { name: "Jane", grade: 85 },
    { name: "Mary", grade: 95 },
    { name: "Mark", grade: 80 }
];
// var highestGrade = 0
// var highestGradeStu = ''
// students.map(function (item){
//     if(highestGrade < item.grade){
//         highestGrade = item.grade;
//         highestGradeStu = item.name;
//     }
// })
// console.log(highestGradeStu)

var highestGrade = students.reduce(function(highestGradeStu,stu){return highestGradeStu.grade<stu.grade?stu:highestGradeStu})
console.log('highestGrade:')
console.log(highestGrade)
var averageGrade = students.reduce(function(total,item){return item.grade + total},0)/students.length
console.log('averageGrade:'+averageGrade)
var namesList = students.map(item => item.name)
console.log('namesList:'+ namesList)