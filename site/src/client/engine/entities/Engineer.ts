import { ENGINEER_ATTACK_STRENGTH, ENGINEER_SPEED } from "../../Config";
import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { Player } from "./Player";


const ENGINEER_WIDTH = 30;
const ENGINEER_HEIGHT = 30;

export class Engineer extends Player {

    public name: string = "Engineer";
    
    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y, "miner", ENGINEER_WIDTH, ENGINEER_HEIGHT, "spanner");
        this.damage = ENGINEER_ATTACK_STRENGTH;
        this.speed = ENGINEER_SPEED;
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
