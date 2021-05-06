import {TStatus} from "../redux/task-reducer"


// Convert first letter to uppercase
export const capitalizeFirstLetter = (string:string) => string.charAt(0).toUpperCase() + string.slice(1)

export const taskStatusDisplay = (status: TStatus) => {
    switch (status) {
        case 0: return 'Задача не выполнена'
        case 1: return 'Задача не выполнена, отредактирована админом'
        case 10: return 'Задача выполнена'
        case 11: return 'Задача отредактирована админом и выполнена'
        default: return 'Unknown status'
    }
}

// ascend and descend to asc, desc
export const makeShortAntdSortOrderName = (order: 'descend' | 'ascend' | null) => order ? order.replace('end', ''):  null


export function makeBodyFormData<Type> (obj: Type) {
    const formData = new FormData()
    for (let [paramName, paramValue] of Object.entries(obj)) {
        formData.set(paramName, paramValue)
    }
    return formData
}