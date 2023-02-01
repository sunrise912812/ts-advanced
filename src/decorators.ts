//function Log(constuctor : Function){
//    console.log(constuctor)
//}

//function Log2(target : any, propName : string | Symbol){
//    console.log(target)
//    console.log(propName)
//}

//function Log3(target : any, propName : string | Symbol, descriptor : PropertyDescriptor){
//    console.log(target)
//    console.log(propName)
//    console.log(descriptor)
//}

//@Log
//class Component{
//    @Log2
//    name : string

//    @Log3
//    get componentName(){
//        return this.name
//    }

//    constructor(name : string){
//        this.name = name
//    }

//    @Log3
//    logName() : void{
//        console.log(`Component name: ${this.name}`)
//    }
//}

interface ComponentDecorator{
    selector : string
    template : string
}

function Component(config : ComponentDecorator){
    return function<T extends { new(...args : any[]) : object }>(Constructor : T){ // используем generic типы чтобы не было ошибок с типизацией, в generic типе указываем что обязательно вернется новый объект
        return class extends Constructor{
            constructor(...args : any[]){
                super(...args) //в args находится то что мы передаем в класс при создании в нашем случае это name, super создаст класс с нужными полями
                const el = document.querySelector(config.selector)! //! - чтобы убрать ошибка возможного получения null
                el.innerHTML = config.template
            }
        }
    }
}

function Bind(_: any, _2 : any, descriptor : PropertyDescriptor) : PropertyDescriptor{
    const original = descriptor.value // Получаем наш оригинальный метод
    return {
        configurable : true,
        enumerable : false,
        get(){ //get - метод должен создаваться таким образом, т.к если сделаем стрелочной функцией то теряется контекст
            return original.bind(this)
        }
    }
}

@Component({
 selector : '#card',
 template : `
    <div class="card">
        <div class="card-content">
            <span class="card-title">Card Component</span>
        </div>
    </div>
 `
}) // При вызове декоратора нужно указать объект с полями из созданного нами интерфейса
class CardComponent{

    constructor(public name : string){
    }

    @Bind
    logName() : void{
        console.log(`Component name : ${this.name}`)
    }
}

const card = new CardComponent('My Card Component')

const btn2 : Element = document.querySelector('#btn')!

btn2.addEventListener('click', card.logName) // Добавляем дополнительно bind так как при таком вызове метода теряется контекст

//======================

type ValidatorType = 'required' | 'email'

interface ValidatorConfig{
    [prop : string] : { // Указывается имя класса
        [validateProp : string] : ValidatorType // Указываются имена полей
    }
}

const validators : ValidatorConfig = {} // Переменная для хранения валидаторов

function Required(target : any, propName : string){
    validators[target.constructor.name] = { // Заносим название класса
        ...validators[target.constructor.name],
        [propName] : 'required' // Заносим название поля
    }
}

function validate(obj : any) : boolean{
    const objConfig = validators[obj.constructor.name]
    if(!objConfig){ //Если у объекта нет валидатора сразу возвращаем true
        return true
    }
    let isValid : boolean = true
    Object.keys(objConfig).forEach(key=>{
        if(objConfig[key] === 'required'){ // Если поле равно required то делаем валидацию, т.е мы сейчас используем этот декоратор, если будет другой декоратор нужно добавлять ещё один if
            isValid = isValid && !!obj[key] // !! - приводим к типу boolean, если данного поля не будет в объекте который мы проверяем то возвращаем false
        }
    })
    return isValid
}

class Form{

    @Required
    public email : string | void

    constructor(email? : string){
        this.email = email
    }
}

const form = new Form('test@mail.ru')

if (validate(form)){
    console.log('Valid', form)
}else{
    console.log('Validation Error')
}
