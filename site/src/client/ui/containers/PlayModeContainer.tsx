import React = require("react");
import { KeyHintsContainer } from "./KeyHintsContainer";
import { useGlobalState } from "../effects/GlobalState";
import { TextComponent, TextFont, TextSize, TextColour } from "../components/TextComponent";
import { DOM_HEIGHT, DOM_WIDTH } from "../../Config";

interface PlayModeContainerProps {}

export const PlayModeContainer: React.FunctionComponent<PlayModeContainerProps> = (
    props
) => {
    const [state, dispatch] = useGlobalState();
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        setTimeout(()=> setCount(count+1), 1000);
      },[count]);
    
    
    if (state.gameStart.showingMenu) {
        return <></>;
    }

    return (
        <div
            style={{
                width: DOM_WIDTH,
                height: DOM_HEIGHT,
                position: "absolute",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start"
            }}
        >
            <KeyHintsContainer />
            <TextComponent
                            text={"" + count}
                            style={{
                                width: "100%",
                                marginTop: 10,
                                marginLeft: 10,
                            }}
                            font={TextFont.REGULAR}
                            size={TextSize.BIG}
                            colour={TextColour.LIGHT}
                        />
        </div>
    );
};
