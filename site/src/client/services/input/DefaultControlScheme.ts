import { Scientist } from "../../engine/entities/Scientist";
import { CanvasHelper } from "../../util/CanvasHelper";
import { ServiceLocator } from "../ServiceLocator";
import { ControlScheme } from "./ControlScheme";


export class DefaultControlScheme implements ControlScheme {
    public constructor(private serviceLocator: ServiceLocator) {}

    public poll(keysDown: { [key: string]: boolean }) {
        if (keysDown.Space) {
            console.log("Space is down");
        }

        
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
        // if (keysDown.KeyE) {
        //     CanvasHelper.setCamera(camera.x, camera.y, camera.scale * 1.01);
        // }
        // if (keysDown.KeyQ) {
        //     CanvasHelper.setCamera(camera.x, camera.y, camera.scale * 0.99);
        // }
    }

    public onKeyDown(key: string, keysDown: { [key: string]: boolean }) {}

    public onKeyUp(key: string, keysDown: { [key: string]: boolean }) {}
}
