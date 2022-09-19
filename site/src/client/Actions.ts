import { Vector2D } from "./types";

export const emptyActions = {
    onGameInitialised: () => {},

    fadeBackground: () => {},
    fadeMenu: () => {},
    setGameFPS: (fps: number) => {},
    setGameLoadPercentage: (percentage: number) => {},
    startGame: () => {},
    stopGame: () => {},

    closeMiniGame: () => {},

    addKeyHint: (args: { id: string; keys: string[]; hint: string }) => {},
    removeKeyHint: (args: { id: string }) => {},

    onEntityCreated: () => {},
    onEntityDeleted: () => {},
    onStateTransition: (from: any, to: any) => {},

    onDamagedByPlayer: (damage: number, ancientPower: boolean) => {},
    onBeatGame: () => {},

    // Game script events
    onChestOpened: () => {},
    onEnemyKilled: () => {},
    onStageReached: (stage: number) => {},
    onMaxStageReached: (stage: number) => {},

}

export type Actions = typeof emptyActions;
