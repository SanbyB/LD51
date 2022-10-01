import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { CharacterEntity } from "./CharacterEntity";



export class Player extends CharacterEntity {


    // TO REMOVE: degbug zoom function
    public zoom: string = "none";

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y);
        this.speed = 1;
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
        const camera = CanvasHelper.getCamera();
        CanvasHelper.setCamera(this.x, this.y, camera.scale);

        // TO REMOVE
        if(this.zoom == "in"){
            CanvasHelper.setCamera(this.x, this.y, camera.scale * 1.01);
        }else if(this.zoom == "out"){
            CanvasHelper.setCamera(this.x, this.y, camera.scale * 0.99);
        }
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }

}
