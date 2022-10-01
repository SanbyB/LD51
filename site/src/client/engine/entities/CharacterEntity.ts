import { clear } from "console";
import { CHARACTER_ANIMATION_MULTIPLIER, CHARACTER_ANIMATION_SPEED_THRESHOLD, CHARACTER_HEALTH_HEIGHT, CHARACTER_HEALTH_SHOWN, CHARACTER_HEALTH_WIDTH } from "../../Config";
import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { PhysicsEntity } from "../PhysicsEntity";
import { DeadBody } from "./DeadBody";



export class CharacterEntity extends PhysicsEntity {

    protected maxHp: number = 20;
    protected hp: number = 20;
    protected attackStrength: number = 5;
    protected speed: number = 0.5;

    // Animation frame to draw
    protected animation = "";
    protected animation_frame = 0;
    protected animation_width = 0;
    protected animation_height = 0;
    protected animation_facing_right = true;
    protected show_health = false;
    protected show_health_timeout: any = undefined;

    public constructor(
        private serviceLocator: ServiceLocator, 
        x: number, 
        y: number, 
        animation: string,
        animation_width: number, 
        animation_height: number,
        ) {
        super(serviceLocator, x, y);
        this.animation = animation;
        this.animation_width = animation_width;
        this.animation_height = animation_height
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
        this.movement();
        this.updateAnimationFrame();
        this.drawMovingAnimation(serviceLocator);
        this.drawHpBar(serviceLocator);
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

        if (this.xVel < 0) {
            this.animation_facing_right = false;
        } else if (this.xVel > 0) {
            this.animation_facing_right = true;
        }
    }

    private drawMovingAnimation(serviceLocator: ServiceLocator) {
        const scale_x = this.animation_facing_right ? 1 : -1;
        CanvasHelper.drawAnimation(serviceLocator, this.animation, Math.floor(this.animation_frame), this.x, this.y, this.animation_width, this.animation_height, scale_x);
    }

    private drawHpBar(serviceLocator: ServiceLocator) {
        if (!this.show_health) return;

        const x = this.x;
        const y = this.y - this.animation_height / 2;
        const ratio = this.hp / this.maxHp;

        CanvasHelper.drawRectangle(
            serviceLocator,
            x,
            y, 
            CHARACTER_HEALTH_WIDTH,
            CHARACTER_HEALTH_HEIGHT,
            0,
            true,
            "#000000"
        );

        CanvasHelper.drawRectangle(
            serviceLocator,
            x,
            y, 
            CHARACTER_HEALTH_WIDTH * ratio,
            CHARACTER_HEALTH_HEIGHT,
            0,
            true,
            "#AA0000"
        );
    } 

    public onDamage(damage: number) {
        if (this.hp == 0) return;
        
        this.hp -= damage;

        if (this.hp <= 0) {
            this.hp = 0;
            this.onDeath();
        }

        this.show_health = true;
        this.show_health_timeout && clearTimeout(this.show_health_timeout);
        this.show_health_timeout = setTimeout(() => this.show_health = false, CHARACTER_HEALTH_SHOWN);
    }

    public onDeath() {
        this.serviceLocator.getWorld().removeEntity(this);
        this.serviceLocator.getWorld().addEntity(new DeadBody(this.x, this.y))
    }

    private updateAnimationFrame() {
        const speed = Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel) * CHARACTER_ANIMATION_MULTIPLIER;
        this.animation_frame = (this.animation_frame + speed) % 2;
        if (speed < CHARACTER_ANIMATION_SPEED_THRESHOLD) {
            this.animation_frame = 0;
        }
    }

}
