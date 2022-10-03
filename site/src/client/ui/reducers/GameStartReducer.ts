import { Reducer } from "@cimacmillan/refunc";
import { Actions } from "../../Actions";
import { TaskInformation } from "../../engine/commands/TaskCommands";

type MenuType = "MAIN" | "CREDITS";

export interface GameStartState {
    showingMenu: boolean;
    showingFade: boolean;
    gameLoadPercentage: number;
    fps: number;
    currentStage: number;
    menu: MenuType;
    gameWon: boolean | undefined;
    score: number;
    task: {
        info: TaskInformation,
        onDone: (success: boolean) => void
    } | undefined
}

export const gameStartReducer: Reducer<GameStartState, Actions> = {
    state: {
        showingMenu: true,
        showingFade: true,
        gameLoadPercentage: 0,
        fps: 0,
        currentStage: 0,
        menu: "MAIN",
        task: undefined,
        gameWon: undefined,
        score: 0
    },
    actions: {
        startGame: (state: GameStartState) => ({
            ...state,
            showingMenu: false,
            showingFade: false,
            menu: "MAIN"
        }),
        stopGame: (state, gameWon: boolean) => ({
            ...state,
            showingMenu: true,
            showingFade: true,
            menu: "MAIN",
            gameWon
        }),
        updateScore: (state, score: number) => ({
            ...state,
            score: score,
        }),
        fadeBackground: (state: GameStartState) => ({
            ...state,
            showingFade: true,
        }),
        fadeMenu: (state: GameStartState) => ({
            ...state,
            showingMenu: true,
        }),
        setGameLoadPercentage: (state: GameStartState, x: number) => ({
            ...state,
            gameLoadPercentage: x,
        }),
        setGameFPS: (state: GameStartState, x: number) => ({
            ...state,
            fps: x,
        }),
        onTaskOpened: (state: GameStartState, info: TaskInformation, onDone: (success: boolean) => void) => ({
            ...state,
            task: {
                info, onDone
            }
        }),
        onTaskFinished: (state: GameStartState) => ({
            ...state,
            task: undefined
        })
    },
};
