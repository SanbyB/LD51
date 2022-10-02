import { TaskInformation } from "./engine/commands/TaskCommands";
import { Vector2D } from "./types";

export const emptyActions = {
    onGameInitialised: () => {},

    fadeBackground: () => {},
    fadeMenu: () => {},
    setGameFPS: (fps: number) => {},
    setGameLoadPercentage: (percentage: number) => {},
    startGame: () => {},
    stopGame: (won: boolean) => {},

    addKeyHint: (args: { id: string; keys: string[]; hint: string }) => {},
    removeKeyHint: (args: { id: string }) => {},

    onEntityCreated: () => {},
    onEntityDeleted: () => {},
    onStateTransition: (from: any, to: any) => {},


    onTaskOpened: (info: TaskInformation, onDone: (success: boolean) => void) => {},
    onTaskFinished: () => {}



}

export type Actions = typeof emptyActions;
