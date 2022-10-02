import { CHARACTER_MOUSE_DISANCE_INFLUENCE } from "../../Config";
import { Scientist } from "../../engine/entities/Scientist";
import { Task } from "../../engine/entities/Task";
import { Zombie } from "../../engine/entities/ZombieEntity";
import { CanvasHelper } from "../../util/CanvasHelper";
import { ServiceLocator } from "../ServiceLocator";
import { ControlScheme } from "./ControlScheme";


export class DefaultControlScheme implements ControlScheme {
    public constructor(private serviceLocator: ServiceLocator) {}

    public poll(keysDown: { [key: string]: boolean }) {
       
        if (keysDown.KeyW) {
            this.serviceLocator.getScriptingService().controller.state.moveDown(-0.2);
        }
        if (keysDown.KeyS) {
            this.serviceLocator.getScriptingService().controller.state.moveDown(0.2);
        }
        if (keysDown.KeyA) {
            this.serviceLocator.getScriptingService().controller.state.moveRight(-0.2);
        }
        if (keysDown.KeyD) {
            this.serviceLocator.getScriptingService().controller.state.moveRight(0.2);
        }


    }

    public onKeyDown(key: string, keysDown: { [key: string]: boolean }) {
        if (key == "Space") {
            for (let entity of this.serviceLocator.getWorld().getEntityArray()) {
                if (entity instanceof Task && (entity as Task).canInteract) {
                    (entity as Task).use();
                }
            }

            this.serviceLocator.getScriptingService().controller.bomber.onDamage(100, 0);
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
    }

    public onMouseUp = (event: MouseEvent) => {
    }
}
