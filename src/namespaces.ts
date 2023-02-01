/// <reference path="form-namespace.ts"/>
//Сверху импортируем namespace из файла form-namespace.ts

namespace FormNameSpace{ //Оборачиваем наш класс в namespace
class MyForm{
    private type : FormType = 'inline'
    private state : FormState = 'active'

    constructor(public email : string){}

    getInfo() : FormInfo{
        return {
            type : this.type,
            state : this.state
        }
    }
}

export const form2 = new MyForm('test@mail.ru')
}

console.log(FormNameSpace.form2)