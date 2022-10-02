import { ServiceLocator } from "../../services/ServiceLocator"

export enum TaskType {
    SIMON_SAYS,
    REFLEX
}

export interface SimonSaysInformation {
    type: TaskType.SIMON_SAYS,
    hard: boolean
}

export interface ReflexGame {
    type: TaskType.REFLEX,
    fast: boolean
}

export const TaskNames: Record<TaskType, string> = {
    [TaskType.SIMON_SAYS]: "Enter Panel Passcode",
    [TaskType.REFLEX]: "Stop The Energy Flux",
}

export const TaskImages: Record<TaskType, [string, string]> = {
    [TaskType.SIMON_SAYS]: ["task_buttons", "task_buttons_complete"],
    [TaskType.REFLEX]: ["task_buttons", "task_buttons_complete"]
}

export type TaskInformation = SimonSaysInformation | ReflexGame

export function OpenTask(
    serviceLocator: ServiceLocator,
    taskInfo: TaskInformation,
    onDone: (success: boolean) => void,
) {
    serviceLocator.getStore().getActions().onTaskOpened(taskInfo, onDone)
}


