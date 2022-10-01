import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { Player } from "./Player";


const ENGINEER_WIDTH = 30;
const ENGINEER_HEIGHT = 30;

export class Engineer extends Player {
    
    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y, "miner", ENGINEER_WIDTH, ENGINEER_HEIGHT, "spanner");
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
