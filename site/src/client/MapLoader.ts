import { Entity } from "./engine/Entity";
import { GameMap } from "./Map";
import { ServiceLocator } from "./services/ServiceLocator";

// Map is 64x64 tiles
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 1000;

export class MapLoader {

    public constructor(private serviceLocator: ServiceLocator) {}

    public getEntities(): Entity[] {

        const gameMap = new GameMap(
            this.serviceLocator,
            MAP_WIDTH,
            MAP_HEIGHT
        );

        for (let x = 0; x < MAP_WIDTH; x++) {
            for (let y = 0; y < MAP_HEIGHT; y++) {
                gameMap.setTile(x, y, {
                    image: "tile",
                    collides: true
                });
            }
        }

        return [
            gameMap
        ];
    }



}


