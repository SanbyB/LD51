import { DOM_HEIGHT, DOM_WIDTH, HEIGHT } from "../../Config";
import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { Entity } from "../Entity";

const BALL_WIDTH = 30;
const BALL_HEIGHT = 30;


export class BallEntity implements Entity {

    private x: number = 0;
    private y: number = 0;
    private yVel: number = 0;

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public update(serviceLocator: ServiceLocator) {
        if (this.y > HEIGHT - BALL_HEIGHT) {
            this.y = HEIGHT - BALL_HEIGHT;
            this.yVel = -Math.abs(this.yVel) * 0.8;

            serviceLocator.getAudioService().play("boing", Math.abs(this.yVel));
        } else {
            this.y += this.yVel;
            this.yVel += 0.1;
        }

        CanvasHelper.drawSprite(serviceLocator, "glorp", this.x, this.y, BALL_WIDTH, BALL_HEIGHT);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
