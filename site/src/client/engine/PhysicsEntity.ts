import { DOM_HEIGHT, DOM_WIDTH, HEIGHT, TILE_HEIGHT, TILE_WIDTH } from "../Config";
import { ServiceLocator } from "../services/ServiceLocator";
import { Entity } from "./Entity";



export class PhysicsEntity implements Entity {

    // position and movement variables
    protected x: number = 0;
    protected y: number = 0;
    protected xVel: number = 0;
    protected yVel: number = 0;
    protected frictCoeff = 0.05;

    // size of img
    protected width = 30;
    protected height = 30;


    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public update(serviceLocator: ServiceLocator) {
        this.x += this.xVel;
        this.y += this.yVel;
        this.friction();
        this.boundCheck();
        this.collisionCheck(serviceLocator);
    }

    // Movement functions to call when you want the entity to move
    public moveRight(speed: number){
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
        if(this.x < 0){
            this.xVel = -this.xVel;
            this.x = 0;
        }else if(this.x > DOM_WIDTH){
            this.xVel = -this.xVel;
            this.x = DOM_WIDTH;
        }
        if(this.y < 0){
            this.yVel = -this.yVel;
            this.y = 0;
        }else if(this.y > DOM_HEIGHT){
            this.yVel = -this.yVel;
            this.y = DOM_HEIGHT;
        }
    }

    private collisionCheck(serviceLocator: ServiceLocator){
        console.log("tile");
        console.log(Math.floor(this.x/TILE_WIDTH), Math.floor(this.y/TILE_HEIGHT));
        console.log(serviceLocator.getScriptingService().getMap().getTile(Math.floor(this.x/TILE_WIDTH), Math.floor(this.y/TILE_HEIGHT)));
        let left: number = Math.floor(this.x/TILE_WIDTH);
        let right: number = Math.floor((this.x + this.width)/TILE_WIDTH);
        let up: number = Math.floor(this.y/TILE_HEIGHT);
        let low: number = Math.floor((this.y + this.height)/TILE_HEIGHT);
        // set tile to be the getTile function
        let tile = (x: number, y: number) => serviceLocator.getScriptingService().getMap().getTile(x, y);

        if(tile(left, up)){
            if(tile(left, low)){
                this.xVel = -this.xVel;
                this.x = right * TILE_WIDTH;
            }else{
                this.yVel = -this.yVel;
                this.y = low * TILE_HEIGHT;
            }
        }else if(tile(right, low)){
            if(tile(right, up)){
                this.xVel = -this.xVel;
                // DONT THINK THIS WILL WORK
                this.x = left * TILE_WIDTH;
            }else{
                this.yVel = -this.yVel;
                this.y = up * TILE_HEIGHT;
            }
        }
    }



    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
