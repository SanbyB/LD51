import { TILE_HEIGHT, TILE_WIDTH } from "./Config";
import { TaskType } from "./engine/commands/TaskCommands";
import { BallEntity } from "./engine/entities/BallEntity";
import { Task } from "./engine/entities/Task";
import { ZombieSpawner } from "./engine/entities/ZombieSpawner";
import { Entity } from "./engine/Entity";
import { GameMap } from "./Map";
import { Sprite } from "./resources/SpriteSheet";
import { getImageData, loadImageData } from "./resources/TextureLoader";
import { ServiceLocator } from "./services/ServiceLocator";
import { randomFloat, randomIntRange } from "./util/math";
import { InitCharacterTileMap } from "./util/Pathfinding";

export class MapLoader {
    private imagedata: ImageData;
    private imagesprite: Sprite;
    

    public constructor(private serviceLocator: ServiceLocator) {
        this.imagedata = getImageData(this.serviceLocator.getResourceManager().getDefaultSpriteSheet().getImage());
        this.imagesprite = this.serviceLocator.getResourceManager().getDefaultSpriteSheet().getSprite("map");
    }

    public getEntities(): Entity[] {
        const mapWidth = this.imagesprite.pixelCoordinate.textureWidth;
        const mapHeight = this.imagesprite.pixelCoordinate.textureHeight;
        

        InitCharacterTileMap(mapWidth, mapHeight);

        const gameMap = new GameMap(
            this.serviceLocator,
            mapWidth,
            mapHeight
        );

        const entities: Entity[] = [];

        for (let x = 0; x < mapWidth; x++) {
            for (let y = 0; y < mapHeight; y++) {
                let mapX = x + this.imagesprite.pixelCoordinate.textureX;
                let mapY = y + this.imagesprite.pixelCoordinate.textureY;

                const index = (mapX + (mapY * this.serviceLocator.getResourceManager().getDefaultSpriteSheet().getWidth())) * 4;

                entities.push(...this.loadPixel(gameMap, x, y,
                    this.imagedata.data[index],
                    this.imagedata.data[index + 1],
                    this.imagedata.data[index + 2],
                    this.imagedata.data[index + 3]));
            }
        }

        return [
            gameMap, ...entities
        ];
    }


    private loadPixel(gameMap: GameMap, x: number, y: number, r: number, g: number, b: number, a: number): Entity[] {
        let entities: Entity[] = [];
        let image: string = "tile".concat(randomIntRange(1, 6).toString());
        let collides: boolean = false;

        // Tile images
        switch (r) {
            case 255: 
                image = "tile_crate";
                collides = true;
                break;
        }


        // Entites
        switch (g) {
            case 255:
                entities.push(new ZombieSpawner(this.serviceLocator, x * TILE_WIDTH, y * TILE_HEIGHT))
                break;
        }

        switch (b) {
            case 255:
                entities.push(new Task(
                    this.serviceLocator, 
                    x * TILE_WIDTH, y * TILE_HEIGHT
                ))
                break;
        }

        gameMap.setTile(x, y, {
            image,
            collides
        })
        return entities;
    }


}


