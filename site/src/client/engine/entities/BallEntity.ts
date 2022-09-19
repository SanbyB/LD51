import { DOM_HEIGHT, DOM_WIDTH, HEIGHT } from "../../Config";
import { Audios } from "../../resources/manifests/Audios";
import { ServiceLocator } from "../../services/ServiceLocator";
import { Entity } from "../Entity";

const BALL_WIDTH = 30;
const BALL_HEIGHT = 30;

function drawSprite(serviceLocator: ServiceLocator, sprite: string, x: number, y: number, width: number, height: number) {
    const spriteSheet = serviceLocator.getResourceManager().getDefaultSpriteSheet();
    const ball = spriteSheet.getSprite(sprite);
    serviceLocator.getCanvas().drawImage(
        spriteSheet.getImage(),
        ball.pixelCoordinate.textureX,
        ball.pixelCoordinate.textureY,
        ball.pixelCoordinate.textureWidth - 1,
        ball.pixelCoordinate.textureHeight - 1,
        x, y, width, height
    );
}

export class BallEntity implements Entity {

    private x: number = 0;
    private y: number = 0;
    private yVel: number = 0;

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public update(serviceLocator: ServiceLocator) {
        if (this.y > HEIGHT - BALL_HEIGHT) {
            this.y = HEIGHT - BALL_HEIGHT;
            this.yVel = -Math.abs(this.yVel) * 0.8;

            serviceLocator.getAudioService().play(
                serviceLocator.getResourceManager().manifest.audio[Audios.ENEMY_KILLED], Math.abs(this.yVel)
            );
        } else {
            this.y += this.yVel;
            this.yVel += 0.1;
        }

        drawSprite(serviceLocator, "glorp", this.x, this.y, BALL_WIDTH, BALL_HEIGHT);
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
