import { CHARACTER_MOUSE_DISANCE_INFLUENCE } from "../../Config";
import { DeregisterKeyHint, RegisterKeyHint } from "../../engine/commands/UICommands";
import { Scientist } from "../../engine/entities/Scientist";
import { Task } from "../../engine/entities/Task";
import { Zombie } from "../../engine/entities/ZombieEntity";
import { CanvasHelper } from "../../util/CanvasHelper";
import { ServiceLocator } from "../ServiceLocator";
import { ControlScheme } from "./ControlScheme";

let moveKeyHint: any = undefined;
let attackKeyHint: any = undefined;

export class DefaultControlScheme implements ControlScheme {
    private tutorial: "NONE" | "MOVE" | "ATTACK" = "NONE"; 
    public constructor(private serviceLocator: ServiceLocator) {}

    public onEnter() {
        if (attackKeyHint) {
            DeregisterKeyHint(attackKeyHint);
        }
        moveKeyHint = moveKeyHint == undefined ? RegisterKeyHint(this.serviceLocator)({ code: ["w","a","s","d"], hint: "Move"}) : moveKeyHint;
        this.tutorial = "MOVE";
    }

    public poll(keysDown: { [key: string]: boolean }) {
        if (keysDown.KeyW) {
            this.serviceLocator.getScriptingService().controller.state.moveDown(-0.2);
            this.onMove();
        }
        if (keysDown.KeyS) {
            this.serviceLocator.getScriptingService().controller.state.moveDown(0.2);
            this.onMove();
        }
        if (keysDown.KeyA) {
            this.serviceLocator.getScriptingService().controller.state.moveRight(-0.2);
            this.onMove();
        }
        if (keysDown.KeyD) {
            this.serviceLocator.getScriptingService().controller.state.moveRight(0.2);
            this.onMove();
        }
    }

    private onMove() {
        if (this.tutorial == "MOVE" && moveKeyHint) {
            DeregisterKeyHint(this.serviceLocator)(moveKeyHint);
            this.tutorial = "ATTACK";
            attackKeyHint = attackKeyHint == undefined ? RegisterKeyHint(this.serviceLocator)({ code: ["Mouse Click"], hint: "Attack"}) : attackKeyHint;
        }
    }

    public onKeyDown(key: string, keysDown: { [key: string]: boolean }) {
        if (key == "Space") {
            for (let entity of this.serviceLocator.getWorld().getEntityArray()) {
                if (entity instanceof Task && (entity as Task).canInteract) {
                    (entity as Task).use();
                }
            }
        }
    }

    public onKeyUp(key: string, keysDown: { [key: string]: boolean }) {}

    public onMouseMove = (event: MouseEvent) => {
        let rect = (event.target as any).getBoundingClientRect();
        let diffX = (event.x - rect.x) - (rect.width / 2);
        let diffY = (event.y - rect.y) - (rect.height / 2);
        let angle = (Math.atan2(diffX, -diffY) / Math.PI) * 180;
        let distance = Math.sqrt(diffX * diffX + diffY * diffY) * CHARACTER_MOUSE_DISANCE_INFLUENCE;
        this.serviceLocator.getScriptingService().controller.state.setHand(angle, distance);
    }   

    public onMouseDown = (event: MouseEvent) => {
        let player = this.serviceLocator.getScriptingService().controller.state;
        if(player.hp > 0){
            player.doAttack(
                player.getHandAngle()
            );
        }

        if (this.tutorial == "ATTACK" && attackKeyHint) {
            DeregisterKeyHint(this.serviceLocator)(attackKeyHint);
            this.tutorial = "NONE";
        }
    }

    public onMouseUp = (event: MouseEvent) => {
    }
}
