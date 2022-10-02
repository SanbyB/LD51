import { CHARACTER_ANIMATION_MULTIPLIER, CHARACTER_ANIMATION_SPEED_THRESHOLD } from "../../Config";
import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { CharacterEntity } from "./CharacterEntity";



export class Player extends CharacterEntity {

    public weight: number;
    public name: string;

    public constructor(
        serviceLocator: ServiceLocator, 
        x: number, 
        y: number,
        animation: string,
        animation_width: number, 
        animation_height: number,
        hand_image: string) {
        super(serviceLocator, x, y, animation, animation_width, animation_height, hand_image);
        this.speed = 1;
        this.weight = 1;
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
        this.speedLimit();
    }

    public speedLimit(){
        if(Math.abs(this.xVel) + Math.abs(this.yVel) > this.speed){
            this.xVel /= 1.2;
            this.yVel /= 1.2;
        }
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
