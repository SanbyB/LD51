import { ServiceLocator } from "../../services/ServiceLocator"

export enum TaskType {
    SIMON_SAYS
}

export interface SimonSays {
    type: TaskType,
    sequenceLength: number
}

export interface NumberMemory {
    type: TaskType,
    sizeOfNumbers: number
}

export const TaskNames: Record<TaskType, string> = {
    [TaskType.SIMON_SAYS]: "Defuse the bomb",
}

export const TaskImages: Record<TaskType, [string, string]> = {
    [TaskType.SIMON_SAYS]: ["task_buttons", "task_buttons_complete"]
}

export type TaskInformation = SimonSays | NumberMemory

export function OpenTask(
    serviceLocator: ServiceLocator,
    taskInfo: TaskInformation,
    onDone: (success: boolean) => void,
) {
    serviceLocator.getStore().getActions().onTaskOpened(taskInfo, onDone)
}


