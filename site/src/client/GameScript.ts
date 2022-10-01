import { FOV, ASPECT_RATIO, ZNEAR, ZFAR, WIDTH, HEIGHT } from "./Config";
import { Scientist } from "./engine/entities/Scientist";
import { Zombie } from "./engine/entities/ZombieEntity";
import { Game } from "./Game";
import { GameMap } from "./Map";
import { MapLoader } from "./MapLoader";
import { PlayerController } from "./PlayerController";
import { InputState } from "./services/input/InputService";
import { ServiceLocator } from "./services/ServiceLocator";

export class GameScript {
    private game: Game;
    private serviceLocator: ServiceLocator;
    private gameMap: GameMap;
    public controller: PlayerController;

    public constructor(game: Game) {
        this.game = game;
    }

    public init(serviceLocator: ServiceLocator) {
        this.serviceLocator = serviceLocator;
    }

    public update() {
        this.controller.update(this.serviceLocator);
    }

    public newGame() {
        // Create and add the map to the world
        const mapLoader = new MapLoader(this.serviceLocator);
        const entities = mapLoader.getEntities();
        this.gameMap = entities[0] as GameMap;
        for (let entity of entities) {
            this.serviceLocator.getWorld().addEntity(entity);
        }

        this.controller = new PlayerController(this.serviceLocator);
        for(const player of this.controller.players){
            this.serviceLocator.getWorld().addEntity(player);
        }

        const zombie = new Zombie(this.serviceLocator, 60, 10);
        // this.serviceLocator.getWorld().addEntity(zombie);
    }

    public resumeGame() {
        this.serviceLocator.getInputService().setInputState(InputState.DEFAULT);
        this.game.setUpdateWorld(true);
    }

    public getMap() {
        return this.gameMap;
    }
}
