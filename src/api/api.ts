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
    'error',
    'ok',
}

export type TResultStatus = typeof ResultStatusEnum

export type TResponse<D = string, RS = TResultStatus> = {
    message?: D
    status: RS
}

export const taskAPI = {
    get_task_list(page: number, field: null | string, order: null | string){
        return instance.get<TResponse<TMessage>>('/', {
            params: {
                page: page,
                sort_field: field,
                sort_direction: order
            }
        }).then(r => r.data)
    },
    verify(token: string) {
        return instance.post('api-token-verify/', {'token': token})
            .then(r => r.data)
            .catch(e => e.response.data)
    },

    login(username: string, password: string) {
        return instance.post('auth/login/', {username, password})
            .then(r => r.data)
            .catch(e => e.response.data)
    },
    logout() {
        return instance.post('auth/logout/')
    },
}