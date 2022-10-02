import React = require("react");
import { DOM_HEIGHT, DOM_WIDTH, GAME_NAME } from "../../Config";
import { TaskInformation, TaskNames, TaskType } from "../../engine/commands/TaskCommands";
import { TextColour, TextComponent, TextFont, TextSize } from "../components/TextComponent";
import { ViewportComponent } from "../components/ViewportComponent";
import { useGlobalState } from "../effects/GlobalState";
import { Reflex } from "./minigames/Reflex";
import { SimonSays } from "./minigames/SimonSays";


export function getMinigame(task: TaskInformation, onDone: (success: boolean) => void) {
    switch (task.type) {
        case TaskType.SIMON_SAYS:
            return <SimonSays task={task} onDone={onDone}/>
        case TaskType.REFLEX:
            return <Reflex task={task} onDone={onDone}/>
    }
}

export const MinigameContainer: React.FunctionComponent = (props) => {
    const [state, dispatch] = useGlobalState();

    const task = state.gameStart.task;

    if (!task) {
        return <></>;
    }

    const onDone = (success: boolean) => {
        task.onDone(success);
        dispatch.onTaskFinished();
    }

    return (
        <div
            style={{
                width: DOM_WIDTH,
                height: DOM_HEIGHT,
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: 600,
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#000000",
                    borderRadius: 16,
                    opacity: 0.95
                }}
            >
                <TextComponent
                    text={TaskNames[task.info.type]}
                    style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: 10,
                    }}
                    font={TextFont.REGULAR}
                    size={TextSize.BIG}
                    colour={TextColour.LIGHT}
                />
                { getMinigame(task.info, onDone) }
            </div>
        </div>
    );
};