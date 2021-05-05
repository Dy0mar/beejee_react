import {TBaseThunk, TInferActions} from "./redux-store"


const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'
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
    initializedSuccess: (initialized: boolean) => ({type: INITIALIZED_SUCCESS, payload: {initialized}} as const),
    setAppLoading: (isLoading: boolean) => ({type: SET_LOADING, isLoading} as const),
}

// THUNKS
export type TActions = TInferActions<typeof actions>
type TThunk = TBaseThunk<TActions>

export const setAppLoading = (loading: boolean): TThunk => async (dispatch) => {
    dispatch(actions.setAppLoading(loading))
}

export const initializeApp = (): TThunk => async (dispatch) => {
    const token = localStorage.token
    let promises = [Promise.resolve()]
    if (token) {
        promises = []
    }
    Promise.all(promises).finally( () => dispatch(actions.initializedSuccess(true)))
}

export default appReducer