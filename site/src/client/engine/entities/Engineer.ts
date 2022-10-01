import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { Player } from "./Player";


const ENGINEER_WIDTH = 30;
const ENGINEER_HEIGHT = 30;

export class Engineer extends Player {
    
    public name: string = "Engineer";

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y);
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
        CanvasHelper.drawAnimation(serviceLocator, "miner", 0, this.x, this.y, ENGINEER_WIDTH, ENGINEER_HEIGHT);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
