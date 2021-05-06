import {TInferActions} from "./redux-store"
import {ResultStatusEnum, TResponse, TResultStatus} from "../api/api"


const SET_LOADING = 'app/SET_LOADING'
const SET_STATUS = 'app/SET_STATUS'
const SET_MESSAGE = 'app/SET_MESSAGE'

const initialState = {
    isLoading: false,
    status: null as TResultStatus | null,
    message: null as any
}


type TInitialState = typeof initialState


const appReducer = (state= initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_LOADING:
        case SET_STATUS:
        case SET_MESSAGE:
            return {
                ...state,
                ...action.payload,
            }
            default: return state
    }
}

// ACTIONS
export const actions = {
    setAppLoading: (isLoading: boolean) => ({type: SET_LOADING, payload: {isLoading}} as const),
    setAppStatus: (status: TResultStatus) => ({type: SET_STATUS, payload:{status}} as const),
    setAppMessage: (message: any) => ({type: SET_MESSAGE, payload:{message}} as const),
}

// THUNKS
export type TActions = TInferActions<typeof actions>


// COMMON THUNKS
export const withProcessVisualization = function (operation: any, dispatch: any) {
    return async () => {
        dispatch(actions.setAppLoading(true))
        await operation()
        dispatch(actions.setAppLoading(false))
    }
}
export const handleSetResultCode = function<T> (operation: any, dispatch: any) {
    return async () => {
        let result: TResponse<T> = await operation()

        if (result?.status === ResultStatusEnum.error){
            dispatch(actions.setAppStatus(result.status))
            dispatch(actions.setAppMessage(result.message))
        }
        if (result?.status === ResultStatusEnum.ok){
            dispatch(actions.setAppStatus(result.status))
        }
    }
}

// something kind of decorator for processes
export const commonAsyncHandler = (operation: any, dispatch: any) => {
    const setResultCode = handleSetResultCode(operation, dispatch)
    const visualized = withProcessVisualization(setResultCode, dispatch)
    return visualized()
}
// END COMMON THUNKS



export default appReducer