import { DOM_HEIGHT, DOM_WIDTH, HEIGHT } from "../Config";
import { ServiceLocator } from "../services/ServiceLocator";
import { Entity } from "./Entity";



export class PhysicsEntity implements Entity {

    // position and movement variables
    protected x: number = 0;
    protected y: number = 0;
    protected xVel: number = 0;
    protected yVel: number = 0;
    protected frictCoeff = 0.05;


    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public update(serviceLocator: ServiceLocator) {
        this.x += this.xVel;
        this.y += this.yVel;
        this.friction();
        this.boundCheck();
    }

    // Movement functions to call when you want the entity to move
    public moveLeft(speed: number){
        this.xVel += speed;
    }
    public moveDown(speed: number){
        this.yVel += speed;
    }

    // Friction function to run on each update
    // TODO: Consider scaling friction based on current speed
    private friction(){
        if(this.yVel > 0){
            this.yVel -= this.frictCoeff
            // Don't let friction reverse direction
            if(this.yVel < 0){
                this.yVel = 0;
            }
        }
        if(this.yVel < 0){
            this.yVel += this.frictCoeff
            // Don't let friction reverse direction
            if(this.yVel > 0){
                this.yVel = 0;
            }
        }
        if(this.xVel > 0){
            this.xVel -= this.frictCoeff
            // Don't let friction reverse direction
            if(this.xVel < 0){
                this.xVel = 0;
            }
        }
        if(this.xVel < 0){
            this.xVel += this.frictCoeff
            // Don't let friction reverse direction
            if(this.xVel > 0){
                this.xVel = 0;
            }
        }
    }

    // Check if the entity hits a boundary
    private boundCheck(){
        if(this.x < 0 || this.x > DOM_WIDTH){
            this.xVel = -this.xVel;
        }
        if(this.y < 0 || this.y > DOM_HEIGHT){
            this.yVel = -this.yVel;
        }
    }



    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
