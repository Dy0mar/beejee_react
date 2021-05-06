import {TAppState} from "../redux/redux-store"


export const SIsLoading = (state: TAppState) => state.app.isLoading
export const SGetAppStatus = (state: TAppState) => state.app.status
export const SGetAppMessage = (state: TAppState) => state.app.message
