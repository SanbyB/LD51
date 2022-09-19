import { Game } from "../Game";
import React = require("react");
import { useGlobalState } from "./effects/GlobalState";
import { GameMenuContainer } from "./containers/GameMenuContainer";
import { GameFadeContainer } from "./containers/GameFadeContainer";
import { PlayModeContainer } from "./containers/PlayModeContainer";
import { LoadingScreenContainer } from "./containers/LoadingScreenContainer";

export interface UIContainerProps {}

export const UIContainer: React.FunctionComponent<UIContainerProps> = (
    props
) => {
    const [state, dispatch] = useGlobalState();

    return (
        <div style={{ position: "absolute" }}>
            {state.uiState.canAccessGame ? (
                <>
                    <PlayModeContainer />
                    <GameFadeContainer />
                    <GameMenuContainer />
                </>
            ) : (
                <>
                    <LoadingScreenContainer />
                </>
            )}
        </div>
    );
};
