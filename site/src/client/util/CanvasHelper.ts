import { HEIGHT, WIDTH } from "../Config";
import { Sprite } from "../resources/SpriteSheet";
import { ServiceLocator } from "../services/ServiceLocator";

interface Camera {
    x: number;
    y: number;
    scale: number;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }
}

export class CanvasHelper {
    private static camera_x: number = 0;
    private static camera_y: number = 0;
    private static scale: number = 1;

    public static setCamera(x: number, y: number, scale: number) {
        this.camera_x = x;
        this.camera_y = y;
        this.scale = scale;
    }

    public static getCamera(): Camera {
        const w = WIDTH / this.scale;
        const h = HEIGHT / this.scale;

        return {
            x: this.camera_x,
            y: this.camera_y,
            scale: this.scale,
            bounds: 
            {
                x: this.camera_x - (w/2),
                y: this.camera_y - (h/2),
                width: w,
                height: h
            }
        }
    }

    public static drawImage(
        serviceLocator: ServiceLocator, 
        sprite: Sprite, 
        x: number, 
        y: number, 
        width: number, 
        height: number,
        scale_x: number = 1,
        scale_y: number = 1,
        degrees: number = 0
        ) {
        const spriteSheet = serviceLocator.getResourceManager().getDefaultSpriteSheet();
        const canvas =  serviceLocator.getCanvas();
        canvas.save();
        canvas.translate(((x - this.camera_x) * this.scale) + WIDTH/2, ((y - this.camera_y) * this.scale) + HEIGHT/2);
        var rad = degrees * Math.PI / 180;    
        canvas.rotate(rad);
        canvas.scale(scale_x, scale_y);
        serviceLocator.getCanvas().drawImage(
            spriteSheet.getImage(),
            sprite.pixelCoordinate.textureX,
            sprite.pixelCoordinate.textureY,
            sprite.pixelCoordinate.textureWidth,
            sprite.pixelCoordinate.textureHeight,
            -width/2 * this.scale, 
            -height/2 * this.scale, 
            width * this.scale, 
            height * this.scale
        );
        canvas.restore();
    }

    public static drawSprite(serviceLocator: ServiceLocator, sprite: string, x: number, y: number, width: number, height: number,
        scale_x: number = 1,
        scale_y: number = 1,
        degrees: number = 0) {
        const spriteSheet = serviceLocator.getResourceManager().getDefaultSpriteSheet();
        const ball = spriteSheet.getSprite(sprite);
        this.drawImage(serviceLocator, ball, x, y, width, height, scale_x, scale_y, degrees);
    }

    public static drawAnimation(serviceLocator: ServiceLocator, animation: string, frame: number, x: number, y: number, width: number, height: number,
        scale_x: number = 1,
        scale_y: number = 1,
        degrees: number = 0) {
        const spriteSheet = serviceLocator.getResourceManager().getDefaultSpriteSheet();
        const ball = spriteSheet.getAnimationFrame(animation, frame);
        this.drawImage(serviceLocator, ball, x, y, width, height, scale_x, scale_y, degrees);

    }
    
    public static drawAnimationInterp(serviceLocator: ServiceLocator, animation: string, frame: number, x: number, y: number, width: number, height: number,
        scale_x: number = 1,
        scale_y: number = 1,
        degrees: number = 0) {
        const spriteSheet = serviceLocator.getResourceManager().getDefaultSpriteSheet();
        const ball = spriteSheet.getAnimationInterp(animation, frame);
        this.drawImage(serviceLocator, ball, x, y, width, height, scale_x, scale_y, degrees);
    }

}

