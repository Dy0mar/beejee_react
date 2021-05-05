import {TBaseThunk, TInferActions} from "./redux-store"
import {ResultStatusEnum, taskAPI, TResultStatus} from "../api/api"
import {commonAsyncHandler} from "./app-reducer"

const GET_TASK_LIST = 'task/GET_TASK_LIST'

export type TStatus = null | number

export type TTask = {
    id: null | number,
    username: null | string,
    email: null | string,
    text: null | string,
    status: TStatus,
}

export type TMessage = {
    tasks: null | TTask[]
    total_task_count: string
}

const initialState = {
    status: ResultStatusEnum,
    message: {} as TMessage | undefined
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
    get_task_list: (status: TResultStatus, message: TMessage | undefined ) => ({type: GET_TASK_LIST, payload: {status, message}} as const),
}

// THUNKS
export type TActions = TInferActions<typeof actions>
type TThunk = TBaseThunk<TActions>

// null| string = null
export const getTaskList = (page= 1, field: null| string = '', order: null | string = null): TThunk => async (dispatch) => {
    await commonAsyncHandler(async () => {
        const data = await taskAPI.get_task_list(page, field, order)
        const {status, message} = data
        dispatch(actions.get_task_list(status, message))
    }, dispatch)

}

export default taskReducer