import {TInferActions} from "./redux-store"


const SET_LOADING = 'app/SET_LOADING'


const initialState = {
    initialized: false,
    isLoading: false
}


type TInitialState = typeof initialState


const appReducer = (state= initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            }
            default: return state
    }
}

// ACTIONS
export const actions = {
    setAppLoading: (isLoading: boolean) => ({type: SET_LOADING, isLoading} as const),
}

// THUNKS
export type TActions = TInferActions<typeof actions>

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

export default appReducer