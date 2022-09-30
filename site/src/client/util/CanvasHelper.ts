import { Sprite } from "../resources/SpriteSheet";
import { ServiceLocator } from "../services/ServiceLocator";

export class CanvasHelper {

    public static drawImage(serviceLocator: ServiceLocator, sprite: Sprite, x: number, y: number, width: number, height: number) {
        const spriteSheet = serviceLocator.getResourceManager().getDefaultSpriteSheet();
        serviceLocator.getCanvas().drawImage(
            spriteSheet.getImage(),
            sprite.pixelCoordinate.textureX,
            sprite.pixelCoordinate.textureY,
            sprite.pixelCoordinate.textureWidth - 1,
            sprite.pixelCoordinate.textureHeight - 1,
            x, y, width, height
        );
    }

    public static drawSprite(serviceLocator: ServiceLocator, sprite: string, x: number, y: number, width: number, height: number) {
        const spriteSheet = serviceLocator.getResourceManager().getDefaultSpriteSheet();
        const ball = spriteSheet.getSprite(sprite);
        this.drawImage(serviceLocator, ball, x, y, width, height);
    }

    public static drawAnimation(serviceLocator: ServiceLocator, animation: string, frame: number, x: number, y: number, width: number, height: number) {
        const spriteSheet = serviceLocator.getResourceManager().getDefaultSpriteSheet();
        const ball = spriteSheet.getAnimationFrame(animation, frame);
        this.drawImage(serviceLocator, ball, x, y, width, height);

    }
    
    public static drawAnimationInterp(serviceLocator: ServiceLocator, animation: string, frame: number, x: number, y: number, width: number, height: number) {
        const spriteSheet = serviceLocator.getResourceManager().getDefaultSpriteSheet();
        const ball = spriteSheet.getAnimationInterp(animation, frame);
        this.drawImage(serviceLocator, ball, x, y, width, height);
    }

}

