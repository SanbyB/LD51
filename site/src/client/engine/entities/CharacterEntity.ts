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
        super.update(serviceLocator);
        this.movement();
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }

    public movement(){
        if(Math.abs(this.xVel) > this.speed){
            this.xVel = Math.sign(this.xVel) * this.speed;
        }
        if(Math.abs(this.yVel) > this.speed){
            this.yVel = Math.sign(this.yVel) *  this.speed;
        }
    }
}
