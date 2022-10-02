import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { OpenTask, TaskImages, TaskInformation, TaskNames, TaskType } from "../commands/TaskCommands";
import { DeregisterKeyHint, RegisterKeyHint } from "../commands/UICommands";
import { Entity } from "../Entity";

const TASK_SIZE = 32;
const TASK_USE_DISTANCE = 32;

export class Task implements Entity {

    public canInteract = false;
    public complete = false;
    private keyHint: number = undefined;

    public constructor(
        private serviceLocator: ServiceLocator,
        private x: number,
        private y: number,
        private task_type: TaskType
    ) {

    }

    public update(serviceLocator: ServiceLocator) {
        if (this.complete) {
            CanvasHelper.drawSprite(
                serviceLocator,
                TaskImages[this.task_type][1],
                this.x,
                this.y,
                TASK_SIZE,
                TASK_SIZE
            );

            return;
        }

        CanvasHelper.drawSprite(
            serviceLocator,
            TaskImages[this.task_type][0],
            this.x,
            this.y,
            TASK_SIZE,
            TASK_SIZE
        );

        const mainPlayer = serviceLocator.getScriptingService().controller.getMainCharacter();
        const diffX = mainPlayer.x - this.x;
        const diffY = mainPlayer.y - this.y;
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        if (distance < TASK_USE_DISTANCE && this.canInteract == false) {
            this.canInteract = true;
            this.onCanInteract();
        }

        if (distance > TASK_USE_DISTANCE && this.canInteract == true) {
            this.canInteract = false;
            this.onCannotInteract();
        }
    }

    public use() {
        this.serviceLocator.getGame().setUpdateWorld(false);
        OpenTask(this.serviceLocator, this.getTaskInfo(),
        (success: boolean) => {
            console.log("Task done. Complete? ", success);
            this.serviceLocator.getGame().setUpdateWorld(true);
            if (success) {
                this.onComplete();
            }
        })
        if (this.keyHint != undefined) {
            DeregisterKeyHint(this.serviceLocator)(this.keyHint);
        }
    }

    private getTaskInfo(): TaskInformation {
        switch (this.task_type) {
            case TaskType.SIMON_SAYS: 
                return {
                    type: TaskType.SIMON_SAYS,
                    sizeOfNumbers: 1
                }
        }

    }

    public onComplete() {
        this.complete = true;
        this.canInteract = false;
    }

    private onCanInteract() {
        this.keyHint = RegisterKeyHint(this.serviceLocator)({
            code: ["Space"], hint: TaskNames[this.task_type]
        });
    }

    private onCannotInteract() {
        if (this.keyHint != undefined) {
            DeregisterKeyHint(this.serviceLocator)(this.keyHint);
        }
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {

    }

    public onRemovedFromWorld(serviceLocator: ServiceLocator) {

    }

}