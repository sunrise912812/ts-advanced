const cars : string[] = ['Ford', 'Audi']
const cars2 : Array<string> = ['Ford', 'Audi']

const promise = new Promise<string>(resolve =>{ //Указываем что промис вернет нам строку
    setTimeout(()=>{
        resolve('Promise resolved')
    },2000)
})

const promise2 : Promise<number> = new Promise(resolve =>{ //Указываем что промис вернет нам число
    setTimeout(()=>{
        resolve(100)
    },2000)
})

promise.then(data=>console.log(data.toUpperCase()))
promise2.then(data=>console.log(data.toFixed()))

function mergeObject<T extends object, R extends object>(a : T, b : R) : T & R{ // Указываем что мы принимаем типы T, R далее явно указываем что возвращаются типы T и R, так автокомплит будет видеть поля объекта.
    return Object.assign({}, a, b)
}

const merge = mergeObject({name : 'Pavel'}, {age : 31})
const merge2 = mergeObject({model : 'Ford'}, {year : 2015})
//const merge3 = mergeObject('aaa', 'bbb') - работать не будет так как в extends указали что передаваться должны только объекты

console.log(merge.name)
console.log(merge2.model)
//console.log(merge3)

//================

interface ILength {
    length: number
  }
  
  function withCount<T extends ILength>(value: T): {value: T, count: string} { // Наследуем интерфейс ILength для того чтобы явно указать что у нас присутвует поле length у типа T, то есть в нашем случае у строки есть поле length, value указываем generic type, также указываем возвращаемые поля у объекта
    return {
      value,
      count: `В этом объекте ${value.length} символов`
    }
  }

console.log(withCount('TypeScript'))
console.log(withCount(['I', 'Am', 'Array']))
//console.log(withCount(25)) - работать не будет так как в числах нет поля length
console.log({length : 20}) //Указываем объект у которого есть поле length

//===================

function getObjectValue<T extends object, R extends keyof T>(obj : T, key : R){
    //Указываем generic type T который наследуется от объекта, вторым параметром создаем generic type R который наследуется от ключей типа T потому что T у нас объект и имеет ключи
    return obj[key]
}

const person = {
    name : 'Pavel',
    age : 31
}

console.log(getObjectValue(person, 'name'))
console.log(getObjectValue(person, 'age'))
//console.log(getObjectValue(person, 'job')) - работать не будет т.к объект person не имеет ключа job

class Collection<T extends number | string | boolean>{

    constructor(private _items : T[] = []){}

    add(item : T){
        this._items.push(item)
    }

    remove(item : T){
        this._items = this._items.filter(i=>i!==item)
    }

    get items() : T[]{
        return this._items
    }
}

const strings = new Collection<string>(['I', 'Am', 'Strings'])
strings.add('!')
strings.remove('Am')
console.log(strings.items)

const numbers = new Collection<number>([1, 2, 3])
numbers.add(5)
numbers.remove(2)
console.log(numbers.items)

//const objs = new Collection([{a : 1}, {b : 2}]) - работать не будет так как наша колекция работает только с примитивными типами данных
//objs.remove({b : 2}) //Для объектов метод remove не работает т.к у объектов есть в составе есть разные ссылки поэтому мы не можем удалить объект простов передав его структуру.
//console.log(objs.items)

interface Car{
    model : string
    year : number
}

function createAndValidationCar(model : string, year : number) : Car{
    const car : Partial<Car> = {} //Partila - указывает что мы временно создаем объект и в нем временно не хватает ключей
    if(model.length > 3){
        car.model = model
    }
    if(year > 2000){
        car.year = year
    }
    return car as Car // Указывает TypeScript что вернется объект типа Car
}

const carsGeneric : Readonly<Array<string>> = ['Ford', 'Audi'] // Readonly - запрещает изменять массив, он становится только для чтения
//carsGeneric.shift() // Shift - удаляет первый элемент массива и возвращает его значение.

const ford : Readonly<Car> = {
    model : 'Ford',
    year : 2020
}

//ford.model = 'Ferrari'