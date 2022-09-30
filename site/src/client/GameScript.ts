import { FOV, ASPECT_RATIO, ZNEAR, ZFAR, WIDTH, HEIGHT } from "./Config";
import { BallEntity } from "./engine/entities/BallEntity";
import { Game } from "./Game";
import { InputState } from "./services/input/InputService";
import { ServiceLocator } from "./services/ServiceLocator";
import { Camera } from "./types";
import { randomIntRange, randomSelection } from "./util/math";

export class GameScript {
    private game: Game;
    private serviceLocator: ServiceLocator;
    private camera: Camera;

    public constructor(game: Game) {
        this.game = game;
    }

    public init(serviceLocator: ServiceLocator) {
        this.serviceLocator = serviceLocator;
    }

    public update() {}

    public newGame() {
        for (let i = 0; i < 10; i++) {
            const x = randomIntRange(0, WIDTH);
            const y = randomIntRange(0, HEIGHT);
            const ball = new BallEntity(this.serviceLocator, x, y);
            this.serviceLocator.getWorld().addEntity(ball);
        }
    }

    public resumeGame() {
        this.serviceLocator.getInputService().setInputState(InputState.DEFAULT);
        this.game.setUpdateWorld(true);
    }
}
