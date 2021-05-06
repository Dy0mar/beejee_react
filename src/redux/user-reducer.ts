import {TBaseThunk, TInferActions} from "./redux-store"
import {taskAPI} from "../api/api"
import {commonAsyncHandler} from "./app-reducer"
import {NullOrString} from "../types/g-types"
import {TActions as TActionsApp, actions as actionsApp} from './app-reducer'

const SET_USER_TOKEN = 'user/SET_USER_TOKEN'


const initialState = {
    token: '' as NullOrString,
    username:  '' as NullOrString
}

type TInitialState = typeof initialState

const userReducer = (state= initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_USER_TOKEN:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

// ACTIONS
export const actions = {
    set_user_token: (token: NullOrString) => ({type: SET_USER_TOKEN, payload: {token}} as const),
    set_username: (username: NullOrString) => ({type: SET_USER_TOKEN, payload: {username}} as const),
}

// THUNKS
export type TActions = TInferActions<typeof actions>
type TThunk = TBaseThunk<TActions | TActionsApp>


export const login = (username: string, password: string): TThunk => async (dispatch) => {
    const data = await taskAPI.login(username, password)

    if (data?.message?.token){
        dispatch(actions.set_user_token(data.message.token))
        dispatch(actions.set_username(username))
    }
    else {
        dispatch(actionsApp.setAppMessage(data.message))
        dispatch(actionsApp.setAppStatus(data.status))
    }
}

export const logout = (): TThunk => async (dispatch) => {
    await commonAsyncHandler(async () => {
        dispatch(actions.set_user_token(null))
        dispatch(actions.set_username(null))
    }, dispatch)
}


export default userReducer