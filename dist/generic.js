"use strict";
const cars = ['Ford', 'Audi'];
const cars2 = ['Ford', 'Audi'];
const promise = new Promise(resolve => {
    setTimeout(() => {
        resolve('Promise resolved');
    }, 2000);
});
const promise2 = new Promise(resolve => {
    setTimeout(() => {
        resolve(100);
    }, 2000);
});
promise.then(data => console.log(data.toUpperCase()));
promise2.then(data => console.log(data.toFixed()));
function mergeObject(a, b) {
    return Object.assign({}, a, b);
}
const merge = mergeObject({ name: 'Pavel' }, { age: 31 });
const merge2 = mergeObject({ model: 'Ford' }, { year: 2015 });
console.log(merge.name);
console.log(merge2.model);
function withCount(value) {
    return {
        value,
        count: `В этом объекте ${value.length} символов`
    };
}
console.log(withCount('TypeScript'));
console.log(withCount(['I', 'Am', 'Array']));
console.log({ length: 20 });
function getObjectValue(obj, key) {
    return obj[key];
}
const person = {
    name: 'Pavel',
    age: 31
};
console.log(getObjectValue(person, 'name'));
console.log(getObjectValue(person, 'age'));
class Collection {
    constructor(_items = []) {
        this._items = _items;
    }
    add(item) {
        this._items.push(item);
    }
    remove(item) {
        this._items = this._items.filter(i => i !== item);
    }
    get items() {
        return this._items;
    }
}
const strings = new Collection(['I', 'Am', 'Strings']);
strings.add('!');
strings.remove('Am');
console.log(strings.items);
const numbers = new Collection([1, 2, 3]);
numbers.add(5);
numbers.remove(2);
console.log(numbers.items);
function createAndValidationCar(model, year) {
    const car = {};
    if (model.length > 3) {
        car.model = model;
    }
    if (year > 2000) {
        car.year = year;
    }
    return car;
}
const carsGeneric = ['Ford', 'Audi'];
const ford = {
    model: 'Ford',
    year: 2020
};
//# sourceMappingURL=generic.js.map