import { TILE_HEIGHT, TILE_WIDTH } from "./Config";
import { Entity } from "./engine/Entity";
import { ServiceLocator } from "./services/ServiceLocator";
import { CanvasHelper } from "./util/CanvasHelper";


interface Tile {
    image: string;
    collides: boolean;
}

export class GameMap implements Entity {
    private tiles: Tile[][];

    public constructor(serviceLocator: ServiceLocator, private mapWidth: number, private mapHeight: number) {
        this.tiles = [];
        for (let x = 0; x < this.mapWidth; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < this.mapHeight; y++) {
                this.tiles[x][y] = {
                    image: "missing_tile",
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

    // returns if the tile collides
    public getTile(x: number, y: number) {
        let tile: Tile = this.tiles[x][y];
        if(tile == undefined){
            return true;
        }else{
            return this.tiles[x][y].collides;
        }
    }

    public setTile(x: number, y: number, tile: Tile) {
        this.tiles[x][y] = tile;
    }

    public getWidth() {
        return this.mapWidth;
    }

    public getHeight() {
        return this.mapHeight;
    }
    
}

