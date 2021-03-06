import {TBaseThunk, TInferActions} from "./redux-store"
import {ResultStatusEnum, taskAPI} from "../api/api"
import {addSuccessMessage, commonAsyncHandler} from "./app-reducer"
import {NullOrNumber, NullOrString} from "../types/g-types"
import {TTaskCreate, TTaskEdit, TTasks} from "../types/task-types"
import {TActions as TActionsApp} from './app-reducer'

const GET_TASK_LIST = 'task/GET_TASK_LIST'

export type TStatus = null | number

export type TTask = {
    id: NullOrNumber,
    username: NullOrString,
    email: NullOrString,
    text: NullOrString,
    status: TStatus,
}

const initialState = {
    tasks: [] as TTask[] | undefined,
    total_task_count: ''
}

type TInitialState = typeof initialState

const taskReducer = (state= initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case GET_TASK_LIST:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

// ACTIONS
export const actions = {
    get_task_list: (tasks: TTask[] | undefined, total_task_count: string ) => ({
            type: GET_TASK_LIST,
            payload: {tasks, total_task_count}} as const
    ),
}

// THUNKS
export type TActions = TInferActions<typeof actions>
type TThunk = TBaseThunk<TActions | TActionsApp>

export const getTaskList = (params: TTasks | null = null): TThunk => async (dispatch) => {
    await commonAsyncHandler(async () => {
        const data = await taskAPI.get_task_list(params)
        const {message} = data

        dispatch(actions.get_task_list(message.tasks, message.total_task_count))
        return data
    }, dispatch)
}

export const createTask = (values: TTaskCreate): TThunk => async (dispatch) => {
    await commonAsyncHandler(async () => {
        const data = await taskAPI.create_new_task(values)
        if (data.status === ResultStatusEnum.ok)
            await dispatch(addSuccessMessage('Task created!'))
        await dispatch(getTaskList())
        return data
    }, dispatch)
}

export const editTask = (edit_task: number, values: TTaskEdit): TThunk => async (dispatch) => {
    await commonAsyncHandler(async () => {
        const data = await taskAPI.edit_task(edit_task, values)
        return data
    }, dispatch)
}



export default taskReducer