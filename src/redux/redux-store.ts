import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux"
import thunkMiddleware, {ThunkAction} from "redux-thunk"

import appReducer from "./app-reducer"
import taskReducer from "./task-reducer"


// @ts-ignore
const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    app: appReducer,
    task: taskReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export type TAppState = ReturnType<typeof rootReducer>
export type TInferActions<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
export type TBaseThunk<A extends Action, R = Promise<void>> = ThunkAction<R, TAppState, unknown, A>

export default store
