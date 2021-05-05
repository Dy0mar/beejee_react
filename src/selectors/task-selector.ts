import {TAppState} from "../redux/redux-store"


export const SGetTotalTaskCount = (state: TAppState) => state.task.message?.total_task_count
export const STasks = (state: TAppState) => state.task.message?.tasks