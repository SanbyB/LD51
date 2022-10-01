import { FOV, ASPECT_RATIO, ZNEAR, ZFAR, WIDTH, HEIGHT } from "./Config";
import { Scientist } from "./engine/entities/Scientist";
import { Game } from "./Game";
import { GameMap } from "./Map";
import { MapLoader } from "./MapLoader";
import { InputState } from "./services/input/InputService";
import { ServiceLocator } from "./services/ServiceLocator";

export class GameScript {
    private game: Game;
    private serviceLocator: ServiceLocator;
    private gameMap: GameMap;
    public scientist: Scientist;

    public constructor(game: Game) {
        this.game = game;
    }

    public init(serviceLocator: ServiceLocator) {
        this.serviceLocator = serviceLocator;
    }

    public update() {}

    public newGame() {
        // Create and add the map to the world
        const mapLoader = new MapLoader(this.serviceLocator);
        const entities = mapLoader.getEntities();
        this.gameMap = entities[0] as GameMap;
        for (let entity of entities) {
            this.serviceLocator.getWorld().addEntity(entity);
        }

        this.scientist = new Scientist(this.serviceLocator, 10, 10);
        this.serviceLocator.getWorld().addEntity(this.scientist);
    }

    public resumeGame() {
        this.serviceLocator.getInputService().setInputState(InputState.DEFAULT);
        this.game.setUpdateWorld(true);
    }

    public getMap() {
        return this.gameMap;
    }
}
