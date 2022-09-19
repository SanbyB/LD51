import { Reducer } from "@cimacmillan/refunc";
import { Actions } from "../../Actions";

type MenuType = "MAIN" | "CREDITS";

export interface GameStartState {
    showingMenu: boolean;
    showingFade: boolean;
    gameLoadPercentage: number;
    fps: number;
    currentStage: number;
    menu: MenuType;
}

export const gameStartReducer: Reducer<GameStartState, Actions> = {
    state: {
        showingMenu: true,
        showingFade: true,
        gameLoadPercentage: 0,
        fps: 0,
        currentStage: 0,
        menu: "MAIN"
    },
    actions: {
        startGame: (state: GameStartState) => ({
            ...state,
            showingMenu: false,
            showingFade: false,
            menu: "MAIN"
        }),
        stopGame: (state) => ({
            ...state,
            showingMenu: true,
            showingFade: true,
            menu: "MAIN"
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
        })
    },
};
