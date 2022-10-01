import { DOM_HEIGHT, DOM_WIDTH, HEIGHT } from "../../Config";
import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { Entity } from "../Entity";


const BALL_WIDTH = 30;
const BALL_HEIGHT = 30;

export class Scientist implements Entity {

    private x: number = 0;
    private y: number = 0;
    private xVel: number = 0;
    private yVel: number = 0;

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public update(serviceLocator: ServiceLocator) {
        this.x += this.xVel;

        CanvasHelper.drawSprite(serviceLocator, "scientist", this.x, this.y, BALL_WIDTH, BALL_HEIGHT);
    }
    public move(){
        this.xVel += 0.02;
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
