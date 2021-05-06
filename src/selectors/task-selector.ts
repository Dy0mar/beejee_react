import {TAppState} from "../redux/redux-store"
import {TTask} from "../redux/task-reducer"


export const SGetTotalTaskCount = (state: TAppState): string => state.task.total_task_count
export const STasks = (state: TAppState): TTask[] | undefined => state.task.tasks

export const SGetTaskById = (state: TAppState, taskId: number): TTask | undefined =>
    state.task.tasks?.filter(item => item.id === taskId)[0]