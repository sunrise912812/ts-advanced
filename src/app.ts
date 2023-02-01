class Person{
    constructor(private name : string){

    }
}

const max = new Person('Maxim')

const map = new Map()

const btn : Element  = document.querySelector('#btn')! // ! - указывает TypeScript что null не будет при поиске кнопки

btn.addEventListener('click',()=>{
    alert('Click')
})

let anyFlag

const globalVar = 'Message'

function logInfo(data : string, _? : number){ // _? говорим о том что знаем о не используемом параметре.
    //const message = 'String'
    console.log(data)
    anyFlag = true
    console.log(anyFlag)
}

logInfo('I am log string')

function multiple(a : number, b : number) : number{
    if(a && b){
        return a * b
    } 
    return 0
}