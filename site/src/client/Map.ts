import { Entity } from "./engine/Entity";
import { ServiceLocator } from "./services/ServiceLocator";
import { CanvasHelper } from "./util/CanvasHelper";

// Each tile is 64x64 pixels
const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

// Map is 64x64 tiles
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 1000;

interface Tile {
    image: string;
    collides: boolean;
}

export class GameMap implements Entity {
    private tiles: Tile[][];
    private mapWidth: number = MAP_WIDTH;
    private mapHeight: number = MAP_HEIGHT;

    public constructor(serviceLocator: ServiceLocator) {
        this.tiles = [];
        for (let x = 0; x < this.mapWidth; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < this.mapHeight; y++) {
                this.tiles[x][y] = {
                    image: "tile",
                    collides: false
                }
            }
        }
    }

    public update(serviceLocator: ServiceLocator) {

        // Only draw tiles within camera
        const { x, y, width, height } = CanvasHelper.getCamera().bounds;
        const PADDING = 8;
        const startX = Math.floor(Math.max(x / TILE_WIDTH - PADDING/2, 0));
        const startY = Math.floor(Math.max(y / TILE_HEIGHT - PADDING/2, 0));

        const endWidth = Math.floor(Math.min(width / TILE_WIDTH + PADDING, this.mapWidth));
        const endHeight = Math.floor(Math.min(height / TILE_HEIGHT + PADDING, this.mapHeight));

        for (let x = startX; x < startX + endWidth; x++) {
            for (let y = startY; y < startY + endHeight; y++) {
                const tile = this.tiles[x][y];
                CanvasHelper.drawSprite(
                    serviceLocator, 
                    tile.image,
                    x * TILE_WIDTH,
                    y * TILE_HEIGHT,
                    TILE_WIDTH,
                    TILE_HEIGHT
                );
            }
        }
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {

    }

    public onRemovedFromWorld(serviceLocator: ServiceLocator) {

    }

    public getTile(x: number, y: number) {

    }
    
}

