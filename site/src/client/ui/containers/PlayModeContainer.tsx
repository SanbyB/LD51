import React = require("react");
import { KeyHintsContainer } from "./KeyHintsContainer";
import { useGlobalState } from "../effects/GlobalState";

interface PlayModeContainerProps {}

export const PlayModeContainer: React.FunctionComponent<PlayModeContainerProps> = (
    props
) => {
    const [state, dispatch] = useGlobalState();

    if (state.gameStart.showingMenu) {
        return <></>;
    }

    return (
        <>
            <KeyHintsContainer />
        </>
    );
};
