import { SpriteSheets } from "../../resources/manifests";
import { RenderItem, Sprite } from "../../services/render/types/RenderInterface";
import { ServiceLocator } from "../../services/ServiceLocator";
import { Entity } from "../Entity";

export class BallEntity implements Entity {
    private sprite: Sprite;
    private renderItem: RenderItem;

    public constructor(serviceLocator: ServiceLocator) {
        this.sprite = {
            position: [0, 1],
            size: [100, 100],
            height: 0,
        
            texture: serviceLocator.getResourceManager().getDefaultSpriteSheet().getSprite("blob").textureCoordinate,
            shade: {
                r: 0,
                g: 0,
                b: 0,
                intensity: 1
            }
        };
    }

    public update(serviceLocator: ServiceLocator) {
        serviceLocator.getRenderService().spriteRenderService.updateItem(this.renderItem, this.sprite);
    }
    public onAddedToWorld(serviceLocator: ServiceLocator) {
        this.renderItem = serviceLocator.getRenderService().spriteRenderService.createItem(this.sprite);
    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
        serviceLocator.getRenderService().spriteRenderService.freeItem(this.renderItem);
    }
}
