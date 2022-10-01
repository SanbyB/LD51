import { Scientist } from "../../engine/entities/Scientist";
import { Zombie } from "../../engine/entities/ZombieEntity";
import { CanvasHelper } from "../../util/CanvasHelper";
import { ServiceLocator } from "../ServiceLocator";
import { ControlScheme } from "./ControlScheme";


export class DefaultControlScheme implements ControlScheme {
    public constructor(private serviceLocator: ServiceLocator) {}

    public poll(keysDown: { [key: string]: boolean }) {
       
        if (keysDown.KeyW) {
            console.log("w");
            this.serviceLocator.getScriptingService().controller.state.moveDown(-0.2);
        }
        if (keysDown.KeyS) {
            console.log("s");
            this.serviceLocator.getScriptingService().controller.state.moveDown(0.2);
        }
        if (keysDown.KeyA) {
            console.log("a");
            this.serviceLocator.getScriptingService().controller.state.moveRight(-0.2);
        }
        if (keysDown.KeyD) {
            console.log("d");
            this.serviceLocator.getScriptingService().controller.state.moveRight(0.2);
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
}
