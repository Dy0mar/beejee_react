import axios from "axios"
import {TTask} from "../redux/task-reducer"
import {TTaskCreate, TTasks} from "../types/task-types"
import {makeBodyFormData} from "../utils/utils"
import {TUserLogin} from "../types/username-types"

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

export type TResultStatus = 'error' | 'ok'

type TResponse<D = string, RS = TResultStatus> = {
    message?: D
    status: RS
}

type TMessageLoginSuccess = {
    token?: string
}
type TMessageLoginError = {
    username?: string
    password?: string
}

type TMessageTasksSuccess = {
    tasks?: TTask[]
    total_task_count?: string
}

type TMessageTaskError = {
    username?: string,
    email?: string,
    text?: string,
}

const headers = {
  'Content-Type': 'multipart/form-data'
}

export const taskAPI = {
    get_task_list(params: TTasks | null){
        return instance.get<TResponse<TMessageTasksSuccess | any>>('/', {params: {...params}})
            .then(r => r.data)
    },

    login(data: TUserLogin) {
        const bodyFormData = makeBodyFormData({data})
        return instance.post<TResponse<TMessageLoginSuccess | TMessageLoginError>>('login/', bodyFormData, {headers})
            .then(r => r.data)
            .catch(e => e.response.data)
    },
    create_new_task(data: TTaskCreate){
        const bodyFormData = makeBodyFormData(data)
        return instance.post<TResponse<TTask | TMessageTaskError>>('create/', bodyFormData, {headers})
            .then(r => r.data)
            .catch(e => e.response.data)
    }
}