import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { CharacterEntity } from "./CharacterEntity";
import { Player } from "./Player";


const ZOMBIE_WIDTH = 30;
const ZOMBIE_HEIGHT = 30;
const ZOMBIE_SPEED = 0.1;

export class Zombie extends CharacterEntity {

    private walking_right = true;
    
    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y, "zombie", ZOMBIE_WIDTH, ZOMBIE_HEIGHT);
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);

        this.xVel += this.walking_right ? ZOMBIE_SPEED : -ZOMBIE_SPEED;
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
        setInterval(() => this.walking_right = !this.walking_right, 2000);
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
