import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { PhysicsEntity } from "../PhysicsEntity";

export class Particle extends PhysicsEntity {

    private life_remaining;

    public constructor(serviceLocator: ServiceLocator, 
        x: number, y: number, 
        private size: number, 
        private color: string, 
        private life: number,
        velX: number, velY: number) {
        super(serviceLocator, x, y);
        this.xVel = velX;
        this.yVel = velY;
        this.life_remaining = life;
        this.collides = false;
    }

    public update(serviceLocator: ServiceLocator): void {
        super.update(serviceLocator);

        this.life_remaining--;
        const size_to_draw = (this.life_remaining / this.life) * this.size;

        if (this.life_remaining <= 0) {
            serviceLocator.getWorld().removeEntity(this);
            return;
        }

        CanvasHelper.drawRectangle(serviceLocator, this.x, this.y, size_to_draw, size_to_draw, 0, true, this.color);
    }

}


