import {TBaseThunk, TInferActions} from "./redux-store"
import {TResultStatus} from "../api/api"


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
type TThunk = TBaseThunk<TActions>


// set response data
export const setAppStatus = (status: TResultStatus): TThunk => async (dispatch) => {
    dispatch(actions.setAppStatus(status))
}

export const setAppMessage = (message: any): TThunk => async (dispatch) => {
    if (!!message)
        dispatch(actions.setAppMessage(message))
}
// end set response data


// COMMON THUNKS
export const withProcessVisualization = function (operation: any, dispatch: any) {
    return async () => {
        dispatch(actions.setAppLoading(true))
        await operation()
        dispatch(actions.setAppLoading(false))
    }
}

// something kind of decorator for processes
export const commonAsyncHandler = (operation: any, dispatch: any) => {
    const visualized = withProcessVisualization(operation, dispatch)
    return visualized()
}
// END COMMON THUNKS



export default appReducer