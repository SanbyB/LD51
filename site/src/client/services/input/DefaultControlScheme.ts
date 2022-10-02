import { CHARACTER_MOUSE_DISANCE_INFLUENCE } from "../../Config";
import { Scientist } from "../../engine/entities/Scientist";
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
        this.serviceLocator.getScriptingService().controller.state.doAttack(
            this.serviceLocator.getScriptingService().controller.state.getHandAngle()
        );
    }

    public onMouseUp = (event: MouseEvent) => {
    }
}
