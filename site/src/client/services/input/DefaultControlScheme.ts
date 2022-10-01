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
            this.serviceLocator.getScriptingService().scientist.moveDown(-0.2);
        }
        if (keysDown.KeyS) {
            this.serviceLocator.getScriptingService().scientist.moveDown(0.2);
        }
        if (keysDown.KeyA) {
            this.serviceLocator.getScriptingService().scientist.moveRight(-0.2);
        }
        if (keysDown.KeyD) {
            this.serviceLocator.getScriptingService().scientist.moveRight(0.2);
        }
        // TO REMOVE
        this.serviceLocator.getScriptingService().scientist.zoom = "none";
        if (keysDown.KeyE) {
            this.serviceLocator.getScriptingService().scientist.zoom = "in";
        }
        if (keysDown.KeyQ) {
            this.serviceLocator.getScriptingService().scientist.zoom = "out";
        }


    }

    public onKeyDown(key: string, keysDown: { [key: string]: boolean }) {

        if (key == "Space") {
            const zombie = this.serviceLocator.getWorld().getEntityArray().find(entity => entity instanceof Zombie) as Zombie | undefined;
            if (zombie) {
                zombie.onDamage(5);
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
        this.serviceLocator.getScriptingService().scientist.setHand(angle, distance);
    }   

    public onMouseDown = (event: MouseEvent) => {
    }

    public onMouseUp = (event: MouseEvent) => {
    }
}
