"use strict";
// interface Human {
//   name: string;
//   age: number;
//   gender: string;
// }
// const person = {
//   name: "jaewon",
//   age: 27,
//   gender: "male",
// };
Object.defineProperty(exports, "__esModule", { value: true });
class Human {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const me = new Human("choen", 24, "female");
const sayHi = (person) => {
    return `Hello ${person.name}, your age is ${person.age}, you are a ${person.gender}`;
};
// 3개의 argument를 넣지 않으면 컴파일에러 발생
// 기존 js에서는 오류조차 발생하지 않음
// 멍청함의 실행 방지
console.log(sayHi(me));
//# sourceMappingURL=%EC%97%B0%EC%8A%B5.js.map