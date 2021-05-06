import axios from "axios"
import {TMessage} from "../redux/task-reducer"

const url = 'https://uxcandy.com/~shapoval/test-task-backend/v2/'

const instance = axios.create({
    baseURL: url,
    params: {
        developer: 'Name'
    }
})

export enum ResultStatusEnum {
    error = 'error',
    ok = 'ok'
}

// export type TResultStatus = typeof ResultStatusEnum
export type TResultStatus = 'error' | 'ok'

export type TResponse<D = string, RS = TResultStatus> = {
    message?: D
    status: RS
}

const headers = {
  'Content-Type': 'multipart/form-data'
}

export const taskAPI = {
    get_task_list(page: number, field: null | string, order: null | string){
        return instance.get<TResponse<TMessage | any>>('/', {
            params: {
                page: page,
                sort_field: field,
                sort_direction: order
            }
        }).then(r => r.data)
    },
    login(username: string, password: string) {
        const bodyFormData = new FormData()
        bodyFormData.set('username', username)
        bodyFormData.set('password', password)

        return instance.post('login/', bodyFormData, {headers})
            .then(r => r.data)
            .catch(e => e.response.data)
    },
}