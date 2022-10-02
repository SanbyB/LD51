import React = require("react");
import { DOM_HEIGHT, DOM_WIDTH, GAME_NAME } from "../../Config";
import { TaskInformation, TaskNames, TaskType } from "../../engine/commands/TaskCommands";
import { TextColour, TextComponent, TextFont, TextSize } from "../components/TextComponent";
import { ViewportComponent } from "../components/ViewportComponent";
import { useGlobalState } from "../effects/GlobalState";
import { SimonSays } from "./minigames/SimonSays";


export function getMinigame(task: TaskInformation, onDone: (success: boolean) => void) {
    switch (task.type) {
        case TaskType.SIMON_SAYS:
            return <SimonSays task={task} onDone={onDone}/>
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
        <ViewportComponent
            x={0}
            y={0}
            width={DOM_WIDTH}
            height={DOM_HEIGHT}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
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
        </ViewportComponent>
    );
};