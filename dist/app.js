"use strict";
class Person {
    constructor(name) {
        this.name = name;
    }
}
const max = new Person('Maxim');
const map = new Map();
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
    alert('Click');
});
let anyFlag;
const globalVar = 'Message';
function logInfo(data, _) {
    console.log(data);
    anyFlag = true;
    console.log(anyFlag);
}
logInfo('I am log string');
function multiple(a, b) {
    if (a && b) {
        return a * b;
    }
    return 0;
}
//# sourceMappingURL=app.js.map