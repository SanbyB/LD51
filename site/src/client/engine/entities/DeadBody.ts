import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { Entity } from "../Entity";

const WIDTH = 32;
const HEIGHT = 32;
const REMOVE_TIME = 10000;

export class DeadBody implements Entity {
    public constructor (private x: number, private y: number) {

    }

    public update(serviceLocator: ServiceLocator) {

        CanvasHelper.drawSprite(serviceLocator, "dead_body", this.x, this.y, WIDTH, HEIGHT);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
        setTimeout(() => {
            serviceLocator.getWorld().removeEntity(this);
        }, REMOVE_TIME);
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}

