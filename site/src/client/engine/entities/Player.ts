import { CHARACTER_ANIMATION_MULTIPLIER, CHARACTER_ANIMATION_SPEED_THRESHOLD } from "../../Config";
import { ServiceLocator } from "../../services/ServiceLocator";
import { Camera } from "../../types";
import { CanvasHelper } from "../../util/CanvasHelper";
import { CharacterEntity } from "./CharacterEntity";



export class Player extends CharacterEntity {

    public state: string = "scientist";
    // TO REMOVE: degbug zoom function
    public zoom: string = "none";
    
    // Animation frame to draw
    protected animation_frame = 0;

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

        this.updateAnimationFrame();
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }

    private updateAnimationFrame() {
        const speed = Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel) * CHARACTER_ANIMATION_MULTIPLIER;
        this.animation_frame = (this.animation_frame + speed) % 2;
        if (speed < CHARACTER_ANIMATION_SPEED_THRESHOLD) {
            this.animation_frame = 0;
        }
    }

}
