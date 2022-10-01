import { ServiceLocator } from "../../services/ServiceLocator";
import { PhysicsEntity } from "../PhysicsEntity";



export class CharacterEntity extends PhysicsEntity {

    protected hp: number = 20;
    protected attackStrength: number = 5;
    protected speed: number = 0.5;

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y);
    }

    public update(serviceLocator: ServiceLocator) {
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }

    public movement(){
        
    }
}
