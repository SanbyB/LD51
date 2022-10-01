import { FOV, ASPECT_RATIO, ZNEAR, ZFAR, WIDTH, HEIGHT } from "./Config";
import { BallEntity } from "./engine/entities/BallEntity";
import { MinerEntity } from "./engine/entities/MinerEntity";
import { Scientist } from "./engine/entities/Scientist";
import { Game } from "./Game";
import { GameMap } from "./Map";
import { InputState } from "./services/input/InputService";
import { ServiceLocator } from "./services/ServiceLocator";
import { Camera } from "./types";
import { randomIntRange, randomSelection } from "./util/math";

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
        this.gameMap = new GameMap(this.serviceLocator);
        this.serviceLocator.getWorld().addEntity(this.gameMap);
        this.scientist = new Scientist(this.serviceLocator, 10, 10);
        this.serviceLocator.getWorld().addEntity(this.scientist);

        for (let i = 0; i < 10; i++) {
            const x = randomIntRange(0, WIDTH);
            const y = randomIntRange(0, HEIGHT);
            const ball = new BallEntity(this.serviceLocator, x, y);
            this.serviceLocator.getWorld().addEntity(ball);
        }

        this.serviceLocator.getWorld().addEntity(new MinerEntity(this.serviceLocator, 10, 10));
    }

    public resumeGame() {
        this.serviceLocator.getInputService().setInputState(InputState.DEFAULT);
        this.game.setUpdateWorld(true);
    }

    public getMap() {
        return this.gameMap;
    }
}
