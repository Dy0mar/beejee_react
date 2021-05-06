import {createSelector} from "reselect"
import {TAppState} from "../redux/redux-store"
import {TMessage, TMessageTypes} from "../types/g-types"

export const SIsLoading = (state: TAppState) => state.app.isLoading
export const SGetAppStatus = (state: TAppState) => state.app.status
export const SGetAppMessage = (state: TAppState) => state.app.message

export const getLastMessage = (state: TAppState) => {
    return state.app.messages[state.app.messages.length-1]
}

export const getLastMessageID = createSelector(
    getLastMessage,
    (message) => message ? message.id : 1
)

export const newMessage = (state: TAppState, type: TMessageTypes, msg: string): TMessage => {
    return {
        id: getLastMessageID(state),
        type: type,
        message: msg
    }
}
