import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { Player } from "./Player";


const SOLDIER_WIDTH = 30;
const SOLDIER_HEIGHT = 30;

export class Solider extends Player {

    public name: string = "Solider";

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y);
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
        CanvasHelper.drawAnimation(serviceLocator, "miner", 0, this.x, this.y, SOLDIER_WIDTH, SOLDIER_HEIGHT);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
