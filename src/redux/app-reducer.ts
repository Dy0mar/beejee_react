import {TBaseThunk, TInferActions} from "./redux-store"
import {ResultStatusEnum, TResponse, TResultStatus} from "../api/api"
import {TActions as TActionsUser, actions as actionsUser} from './user-reducer'
import {TMessage} from "../types/g-types";
import {newMessage} from "../selectors/app-selector";


const SET_LOADING = 'app/SET_LOADING'
const SET_STATUS = 'app/SET_STATUS'
const SET_MESSAGE = 'app/SET_MESSAGE'
const SHOW_MESSAGE = 'app/SHOW_MESSAGE'
const ADD_MESSAGE = 'app/ADD_MESSAGE'

const initialState = {
    isLoading: false,
    status: null as TResultStatus | null,
    message: null as any,
    messages: [] as Array<TMessage>,
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
        case SHOW_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(m => m.id !== action.msg.id)
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.msg]
            }
        default: return state

    }
}

// ACTIONS
export const actions = {
    setAppLoading: (isLoading: boolean) => ({type: SET_LOADING, payload: {isLoading}} as const),
    setAppStatus: (status: TResultStatus) => ({type: SET_STATUS, payload:{status}} as const),
    setAppMessage: (message: any) => ({type: SET_MESSAGE, payload:{message}} as const),
    showMessageAction: (msg: TMessage) => ({type: SHOW_MESSAGE, msg} as const),
    addMessageAction: (msg: TMessage) => ({type: ADD_MESSAGE, msg} as const),
}

// THUNKS
export type TActions = TInferActions<typeof actions>
type TThunk = TBaseThunk<TActions | TActionsUser>

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
        const result: TResponse<T> = await operation()

        if (result?.status === ResultStatusEnum.error){
            dispatch(actions.setAppStatus(result.status))
            dispatch(actions.setAppMessage(result.message))
            dispatch(addErrorMessage(JSON.stringify(result.message)))
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

export const addSuccessMessage = (msg: string): TThunk => async (dispatch, getState) => {
    const message = newMessage(getState(), 'success', msg)
    dispatch(actions.addMessageAction(message))
}

export const addErrorMessage = (msg: string): TThunk => async (dispatch, getState) => {
    const message = newMessage(getState(), 'error', msg)
    dispatch(actions.addMessageAction(message))
}

export const showedMessage = (message: TMessage): TThunk => async (dispatch) => {
    dispatch(actions.showMessageAction(message))
}

export const initializeApp = (): TThunk => async (dispatch) => {
    const token = localStorage.token
    const username = localStorage.username

    let promises = [Promise.resolve()]

    // init data set here
    if (token) {
        promises = []
    }
    Promise.all(promises).finally( () => {
        dispatch(actionsUser.set_user_token(token))
        dispatch(actionsUser.set_user_token(username))
    })
}

export default appReducer