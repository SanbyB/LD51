import { CHARACTER_ANIMATION_MULTIPLIER, CHARACTER_ANIMATION_SPEED_THRESHOLD } from "../../Config";
import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { CharacterEntity } from "./CharacterEntity";



export class Player extends CharacterEntity {


    // TO REMOVE: degbug zoom function
    public zoom: string = "none";

    public constructor(
        serviceLocator: ServiceLocator, 
        x: number, 
        y: number,
        animation: string,
        animation_width: number, 
        animation_height: number) {
        super(serviceLocator, x, y, animation, animation_width, animation_height, "test_tube");
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
