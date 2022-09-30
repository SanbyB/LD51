import { ServiceLocator } from "../../services/ServiceLocator";
import { Entity } from "../Entity";


export class MinerEntity implements Entity {
    private x: number;
    private y: number;
    private time: number = 0;

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public update(serviceLocator: ServiceLocator) {
        this.time += 0.02;
        const spriteSheet = serviceLocator.getResourceManager().getDefaultSpriteSheet();
        const ball = spriteSheet.getAnimationInterp("miner", this.time);
        serviceLocator.getCanvas().drawImage(
            spriteSheet.getImage(),
            ball.pixelCoordinate.textureX,
            ball.pixelCoordinate.textureY,
            ball.pixelCoordinate.textureWidth - 1,
            ball.pixelCoordinate.textureHeight - 1,
            this.x, this.y, 50, 50
        );
    };

    public onAddedToWorld(serviceLocator: ServiceLocator) {

    };
 
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {

    };
}