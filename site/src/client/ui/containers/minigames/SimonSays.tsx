import React = require("react");
import { TaskInformation } from "../../../engine/commands/TaskCommands";
import { ViewportComponent } from "../../components/ViewportComponent";

interface Props {
    task: TaskInformation,
    onDone: (success: boolean) => void
}

export const SimonSays: React.FunctionComponent<Props> = (props: Props) => {

    const { task, onDone } = props;

    return (
        <>
            <button
                onClick={() => onDone(true)}
            >Defuse</button>
            <button
                onClick={() => onDone(false)}
            >Do nothing</button>
        </>
    );
};