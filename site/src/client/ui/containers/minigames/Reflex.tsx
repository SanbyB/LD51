import React = require("react");
import { ReflexGame, SimonSaysInformation, TaskInformation } from "../../../engine/commands/TaskCommands";
import { randomIntRange } from "../../../util/math";
import { ViewportComponent } from "../../components/ViewportComponent";
import { GameButtonContainer } from "../GameButtonContainer";

const BAR_WIDTH = 400;
const BAR_HEIGHT = 20;
const INNER_BAR = 40;
const SELECTOR = 10;
const FAST_SPEED = 14;

export const Reflex: React.FunctionComponent<{
    task: ReflexGame,
    onDone: (success: boolean) => void
}> = (props) => {
    const [position, setPosition] = React.useState(0);
    const [travelRight, setTravelRight] = React.useState(true);

    const speed = props.task.fast ? FAST_SPEED : 8;
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            let newPosition = position + (travelRight ? speed : -speed);
            if (newPosition + SELECTOR > BAR_WIDTH) {
                newPosition = BAR_WIDTH - SELECTOR;
                setTravelRight(false);
            } 
            if (newPosition < 0) {
                newPosition = 0;
                setTravelRight(true);
            }
        
            setPosition(newPosition);
        }, 30);
        return () => clearTimeout(timeout);
    }, [position, travelRight]);

    const onSelect = () => {
        const diff = Math.abs((BAR_WIDTH / 2) - position + (SELECTOR / 2));
        props.onDone(diff < INNER_BAR / 2 + SELECTOR/2)

    }

    return (
        <>
        <div style={{
            width: BAR_WIDTH,
            height: BAR_HEIGHT,
            backgroundColor: "#AA0000",
            marginBottom: 8

        }}>
            <div style={{
                position: "absolute",
                marginLeft: BAR_WIDTH / 2 - INNER_BAR / 2,
                width: INNER_BAR,
                height: BAR_HEIGHT,
                backgroundColor: "#00AA00",
            }}/>
            <div style={{
                position: "absolute",
                marginLeft: position,
                width: SELECTOR,
                height: BAR_HEIGHT,
                backgroundColor: "#FFFFFF",
            }}/>
        </div>
        <GameButtonContainer
                width={64}
                height={64}
                style={{}}
                childStyle={{}}
                onSelect={onSelect}
            />
        </>
    );
};