import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { Player } from "./Player";


const SOLDIER_WIDTH = 30;
const SOLDIER_HEIGHT = 30;

export class Solider extends Player {

    public name: string = "Solider";

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y, "soldier", SOLDIER_WIDTH, SOLDIER_HEIGHT);
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
