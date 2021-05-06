import {TAppState} from "../redux/redux-store"


export const SGetUser = (state: TAppState) => state.user
export const SGetUserToken = (state: TAppState) => state.user.token
