import { ServiceLocator } from "../../services/ServiceLocator";
import { CharacterEntity } from "./CharacterEntity";



export class Player extends CharacterEntity {

    public state: string = "scientist";

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y);
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }

}
