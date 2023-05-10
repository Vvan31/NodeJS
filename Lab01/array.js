import { mySum } from './sum.js';


const myArr = [1, 2, 3, 4, 5];
const result = mySum(...myArr); 
console.log(result);

const mySecondArr = () => {
    return myArr.map((item) => {
        return item * 2;
    });
}

const avg = arr => {
    const sum = arr.reduce((acc, cur) => acc + cur);
    const average = sum/arr.length;
    return average;
  }

console.log(mySecondArr().filter((item) => {
    return item > avg(mySecondArr());
    })
);

setTimeout(() => {
    console.log("Goodbye");
}
, 3000);

const employee = {
    name: "John Doe",
    email: "John@gmail.com",
    department: "IT",
    startDate: "01/01/2020"
}

const { name, email } = employee;
const person = { name, email }; 
console.log(person);
