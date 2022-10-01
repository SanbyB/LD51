import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { CharacterEntity } from "./CharacterEntity";



export class Player extends CharacterEntity {

    public state: string = "scientist";

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y);
        this.speed = 1;
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
        const camera = CanvasHelper.getCamera();
        CanvasHelper.setCamera(this.x, this.y, camera.scale);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }

}
