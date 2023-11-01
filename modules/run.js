// const add = require("./math.js");
// console.log(add.add(10, 30)); // exports를 바로 하는 경우, 객체가 add에 담김으로, 이렇게 해야 나옴.
// console.log(add); //{ add: [Function (anonymous)] }

//구조분해 할당을 통해서 이렇게 함수만 가져와 변수에 담은 다음 사용할 수 있음.
const { add } = require("./math.js");
console.log(add); //[Function (anonymous)]

console.log(add(10, 30));
