import { combineReducers, Store } from "@cimacmillan/refunc";
import { Actions, emptyActions } from "../Actions";
import { gameStartReducer, GameStartState } from "./reducers/GameStartReducer";
import { keyHintReducer, KeyHintUIState } from "./reducers/KeyHintReducer";
import { uiReducer, UIState } from "./reducers/UIReducer";

export interface State {
    uiState: UIState;
    gameStart: GameStartState;
    keyHints: KeyHintUIState;
}

export const reducers = {
    uiState: uiReducer,
    gameStart: gameStartReducer,
    keyHints: keyHintReducer,
};

export const store = new Store<State, Actions>(
    combineReducers<State, Actions>(reducers),
    emptyActions
);
