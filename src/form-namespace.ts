namespace FormNameSpace{
    export type FormType = 'inline' | 'block' // Экспортируем все наши сущности для того тобы при импорте в других файлах их можно было использовать
    export type FormState = 'active' | 'disabled'

export interface FormInfo{
    type : FormType
    state : FormState
}
}