import { ServiceLocator } from "../../services/ServiceLocator";
import { Entity } from "../Entity";
import { Zombie } from "./ZombieEntity";

const SPAWN_INTERVAL = 10000;

export class ZombieSpawner implements Entity {
    private spawn_int: any = undefined;

    public constructor(private serviceLocator: ServiceLocator, private x: number, private y: number) {

    }

    public update(serviceLocator: ServiceLocator) {

    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
        this.spawn_int = setInterval(() => this.spawnZombie(), SPAWN_INTERVAL);
    }

    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
        clearInterval(this.spawn_int);
    }

    private spawnZombie() {
        const zombie = new Zombie(this.serviceLocator, this.x, this.y);
        this.serviceLocator.getWorld().addEntity(zombie);
    }

}

