import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { Player } from "./Player";


const BOMBER_WIDTH = 30;
const BOMBER_HEIGHT = 30;

export class Bomber extends Player {
    
    public name: string = "Bomber";

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y, "miner", BOMBER_WIDTH, BOMBER_HEIGHT);
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
