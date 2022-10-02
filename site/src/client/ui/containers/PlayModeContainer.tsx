import React = require("react");
import { KeyHintsContainer } from "./KeyHintsContainer";
import { useGlobalState } from "../effects/GlobalState";
import { TextComponent, TextFont, TextSize, TextColour } from "../components/TextComponent";

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
        <>
            <KeyHintsContainer />

            

            <TextComponent
                            text={"" + count}
                            style={{
                                width: "100%",
                                textAlign: "center",
                                marginTop: 10,
                                marginLeft: 10,
                            }}
                            font={TextFont.REGULAR}
                            size={TextSize.BIG}
                            colour={TextColour.LIGHT}
                        />
        </>
    );
};
