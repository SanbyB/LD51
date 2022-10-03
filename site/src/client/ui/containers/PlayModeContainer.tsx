import React = require("react");
import { KeyHintsContainer } from "./KeyHintsContainer";
import { useDispatchListener, useGlobalState } from "../effects/GlobalState";
import { TextComponent, TextFont, TextSize, TextColour } from "../components/TextComponent";
import { DOM_HEIGHT, DOM_WIDTH } from "../../Config";
import { ProcedureService } from "../../services/jobs/ProcedureService";

interface PlayModeContainerProps {}

export const PlayModeContainer: React.FunctionComponent<PlayModeContainerProps> = (
    props
) => {
    const [state, dispatch] = useGlobalState();
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        const timeout = ProcedureService.setGameTimeout(()=> setCount((count+1) % 10), 1000);
        return () => ProcedureService.clearTimeout(timeout);
      },[count]);
    

    useDispatchListener({
        onCharacterChanged: () => setCount(0)
    }, [])
    
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
                justifyContent: "start",
                pointerEvents: "none"

            }}
        >
            <KeyHintsContainer />
            <TextComponent
                            text={"" + count}
                            style={{
                                height: "min-content",
                                padding: 8,
                                marginTop: 10,
                                marginLeft: 10,
                                textShadow: "4px 4px #000000",
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                borderRadius: 8,
                                backdropFilter: "blur(5px)"
                            }}
                            font={TextFont.REGULAR}
                            size={TextSize.BIG}
                            colour={TextColour.LIGHT}
                        />
        </div>
    );
};
