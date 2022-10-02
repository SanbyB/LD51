import { ServiceLocator } from "../services/ServiceLocator";
import { ConsistentArray } from "../util/array/ConsistentArray";
import { Entity } from "./Entity";

export class World {
    private entityArray: ConsistentArray<Entity>;

    public init(serviceLocator: ServiceLocator) {
        this.entityArray = new ConsistentArray<Entity>();
    }

    public update(serviceLocator: ServiceLocator) {
        const array = this.entityArray.getArray();
        for (let i = 0; i < array.length; i++) {
            array[i].update(serviceLocator);
        }
    }

    public addEntity(entity: Entity) {
        this.entityArray.add(entity);
    }

    public removeEntity(entity: Entity) {
        this.entityArray.remove(entity);
    }

    public getEntityArray() {
        return this.entityArray.getArray();
    }

    public performSync(serviceLocator: ServiceLocator) {
        const toAdd = this.entityArray.getToAdd();
        const toRemove = this.entityArray.getToRemove();
        this.entityArray.sync();
        for (let i = 0; i < toAdd.length; i++) {
            toAdd[i].onAddedToWorld(serviceLocator);
        }

        for (let i = 0; i < toRemove.length; i++) {
            toRemove[i].onRemovedFromWorld(serviceLocator);
        }

        this.entityArray.getArray().sort((a: any, b: any) => {
            if (a.y == undefined) return -1;
            if (b.y == undefined) return 1;
            return a.y < b.y ? -1 : 1;
        });
    }
}
