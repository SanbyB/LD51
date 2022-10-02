import e = require("express");
import { CHARACTER_ANIMATION_MULTIPLIER, CHARACTER_ANIMATION_SPEED_THRESHOLD } from "../../Config";
import { ServiceLocator } from "../../services/ServiceLocator";
import { animation } from "../../util/animation/Animations";
import { GameAnimation } from "../../util/animation/GameAnimation";
import { CanvasHelper } from "../../util/CanvasHelper";
import { CharacterEntity } from "./CharacterEntity";


const FOCUS_WIDTH = 16;
const FOCUS_HEIGHT = FOCUS_WIDTH/2;


export class Player extends CharacterEntity {

    public weight: number;
    public name: string;
    
    private focusAnimation: GameAnimation;
    private isFocussed = false;
    private focusFlicker = 0;
    private focusSpeed = 1000;

    public constructor(
        serviceLocator: ServiceLocator, 
        x: number, 
        y: number,
        animation_name: string,
        animation_width: number, 
        animation_height: number,
        hand_image: string) {
        super(serviceLocator, x, y, animation_name, animation_width, animation_height, hand_image);
        this.speed = 1;
        this.weight = 1;
        this.focusAnimation = animation(x => this.focusFlicker = Math.floor(x * 30)).speed(this.focusSpeed).driven(false);
    }

    public update(serviceLocator: ServiceLocator) {
        this.drawFocus(serviceLocator);
        super.update(serviceLocator);
        this.speedLimit();
    }

    public drawFocus(serviceLocator: ServiceLocator) {
        if (!this.isFocussed) {
            CanvasHelper.drawSprite(
                serviceLocator, 
                "character_shadow",
                this.x,
                this.y + this.animation_height/2,
                FOCUS_WIDTH,
                FOCUS_HEIGHT
                )
            return;
        };

        if (this.focusAnimation.isPlaying() == true) {
            CanvasHelper.drawSprite(
                serviceLocator, 
                this.focusFlicker % 2 == 0 ? "character_focus_ring" : "character_focus_flash",
                this.x,
                this.y + this.animation_height/2,
                FOCUS_WIDTH,
                FOCUS_HEIGHT
                )
        } else {
            CanvasHelper.drawSprite(
                serviceLocator, 
                "character_focus_ring",
                this.x,
                this.y + this.animation_height/2,
                FOCUS_WIDTH,
                FOCUS_HEIGHT
                )
        }
    }

    public speedLimit(){
        if(Math.abs(this.xVel) + Math.abs(this.yVel) > this.speed){
            this.xVel /= 1.2;
            this.yVel /= 1.2;
        }
    }

    public onFocussed() {
        this.isFocussed = true;
        this.focusAnimation.start();
    }

    public onUnfocussed() {
        this.isFocussed = false;
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
