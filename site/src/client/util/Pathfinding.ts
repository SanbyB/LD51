import { random } from "lodash";
import { CharacterEntity } from "../engine/entities/CharacterEntity";
import { GameMap } from "../Map";
import { ServiceLocator } from "../services/ServiceLocator";
import { randomFloat, randomFloatRange } from "./math";

const characterTileMap: { visited: boolean, characters: CharacterEntity[] }[][] = [];
let tileMapWidth = 0;
let tileMapHeight = 0;
export function InitCharacterTileMap(mapWidth: number, mapHeight: number) {
    tileMapWidth = mapWidth;
    tileMapHeight = mapHeight;
    for (let x = 0; x < mapWidth; x++) {
        characterTileMap[x] = [];
        for (let y = 0; y < mapHeight; y++) {
            characterTileMap[x][y] = {
                visited: false,
                characters: []
            }
        }
    }
}
export function AddCharacterToGrid(x: number, y: number, character: CharacterEntity) {
    if (x < 0 || y < 0 || x >= tileMapWidth || y >= tileMapHeight) return;
    characterTileMap[x][y].characters.push(character);
}

export function RemoveCharacterFromGird(x: number, y: number, character: CharacterEntity) {
    if (x < 0 || y < 0 || x >= tileMapWidth || y >= tileMapHeight) return;
    const index = characterTileMap[x][y].characters.indexOf(character);
    if (index < 0) {
        return;
    }
    characterTileMap[x][y].characters.splice(index, 1);
}

interface QueueItem {
    x: number;
    y: number;
    delta: number;
}

export function isValidIndex(x: number, y: number, gameMap: GameMap) {
    if (x < 0 || y < 0 || x >= tileMapWidth || y >= tileMapHeight) {
        return false;
    }
    if (gameMap.getTile(x, y)) {
        return false;
    }
    if (characterTileMap[x][y].visited) {
        return false;
    } else {
        characterTileMap[x][y].visited = true;
    }
    return true;
}

export function getNeighbours(fromX: number, fromY: number, delta: number, gameMap: GameMap) {
    const neighbours: QueueItem[] = [];
    if (isValidIndex(fromX - 1, fromY - 1, gameMap)) neighbours.push({ x: fromX - 1, y: fromY - 1, delta});
    if (isValidIndex(fromX, fromY - 1, gameMap)) neighbours.push({ x: fromX, y: fromY - 1, delta});
    if (isValidIndex(fromX + 1, fromY - 1, gameMap)) neighbours.push({ x: fromX + 1, y: fromY - 1, delta});
    if (isValidIndex(fromX - 1, fromY, gameMap)) neighbours.push({ x: fromX - 1, y: fromY, delta});
    if (isValidIndex(fromX + 1, fromY, gameMap)) neighbours.push({ x: fromX + 1, y: fromY, delta});
    if (isValidIndex(fromX - 1, fromY + 1, gameMap)) neighbours.push({ x: fromX - 1, y: fromY + 1, delta});
    if (isValidIndex(fromX, fromY + 1, gameMap)) neighbours.push({ x: fromX, y: fromY + 1, delta});
    if (isValidIndex(fromX + 1, fromY + 1, gameMap)) neighbours.push({ x: fromX + 1, y: fromY + 1, delta});
    return neighbours;
}

export function PathfindTo(serviceLocator: ServiceLocator, fromX: number, fromY: number, target: CharacterEntity, source: CharacterEntity): number {
    if (source.tileX == target.tileX && source.tileY == target.tileY) {
        return source.angleTo(target);
    }

    for (let x = 0; x < tileMapWidth; x++) {
        for (let y = 0; y < tileMapHeight; y++) {
            characterTileMap[x][y].visited = false;
        }
    }

    const gameMap = serviceLocator.getScriptingService().getMap();
    
    const queue: QueueItem[] = [];
    if (isValidIndex(fromX - 1, fromY - 1, gameMap)) queue.push({ x: fromX - 1, y: fromY - 1, delta: -45});
    if (isValidIndex(fromX, fromY - 1, gameMap)) queue.push({ x: fromX, y: fromY - 1, delta: 0});
    if (isValidIndex(fromX + 1, fromY - 1, gameMap)) queue.push({ x: fromX + 1, y: fromY - 1, delta: 45});
    if (isValidIndex(fromX - 1, fromY, gameMap)) queue.push({ x: fromX - 1, y: fromY, delta: -90});
    if (isValidIndex(fromX + 1, fromY, gameMap)) queue.push({ x: fromX + 1, y: fromY, delta: 90});
    if (isValidIndex(fromX - 1, fromY + 1, gameMap)) queue.push({ x: fromX - 1, y: fromY + 1, delta: 225});
    if (isValidIndex(fromX, fromY + 1, gameMap)) queue.push({ x: fromX, y: fromY + 1, delta: 180});
    if (isValidIndex(fromX + 1, fromY + 1, gameMap)) queue.push({ x: fromX + 1, y: fromY + 1, delta: 135});

    let searching = true;
    let found = false;
    let foundX = 0;
    let foundY = 0;
    let foundDelta = 0;
    while (searching) {
        if (queue.length == 0) {
            break;
        }

        const queue_item = queue.shift();
        const { x, y, delta } = queue_item;
        characterTileMap[x][y].visited = true;

        const index = characterTileMap[x][y].characters.indexOf(target);
        if (index >= 0) {
            found = true;
            foundX = x;
            foundY = y;
            foundDelta = delta;
            break;
        }

        const neighbours = getNeighbours(x, y, delta, gameMap);
        queue.push(...neighbours);

    }

    if (found) {
        return foundDelta;
    }

    return randomFloatRange(0, 360);
}
