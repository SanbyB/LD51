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

        // TODO remove
        const camera = CanvasHelper.getCamera();
        if (keysDown.KeyW) {
            CanvasHelper.setCamera(camera.x, camera.y - 1, camera.scale);
            this.serviceLocator.getScriptingService().scientist.moveDown(-1);
        }
        if (keysDown.KeyS) {
            CanvasHelper.setCamera(camera.x, camera.y + 1, camera.scale);
            this.serviceLocator.getScriptingService().scientist.moveDown(1);
        }
        if (keysDown.KeyA) {
            CanvasHelper.setCamera(camera.x - 1, camera.y, camera.scale);
            this.serviceLocator.getScriptingService().scientist.moveRight(-1);
        }
        if (keysDown.KeyD) {
            CanvasHelper.setCamera(camera.x + 1, camera.y, camera.scale);
            this.serviceLocator.getScriptingService().scientist.moveRight(1);
        }
        if (keysDown.KeyE) {
            CanvasHelper.setCamera(camera.x, camera.y, camera.scale * 1.01);
        }
        if (keysDown.KeyQ) {
            CanvasHelper.setCamera(camera.x, camera.y, camera.scale * 0.99);
        }
    }

    public onKeyDown(key: string, keysDown: { [key: string]: boolean }) {}

    public onKeyUp(key: string, keysDown: { [key: string]: boolean }) {}
}
