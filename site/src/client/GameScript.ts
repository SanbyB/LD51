import { FOV, ASPECT_RATIO, ZNEAR, ZFAR } from "./Config";
import { BallEntity } from "./engine/entities/BallEntity";
import { Game } from "./Game";
import { Audios } from "./resources/manifests/Audios";
import { InputState } from "./services/input/InputService";
import { ServiceLocator } from "./services/ServiceLocator";
import { Camera } from "./types";
import { randomSelection } from "./util/math";

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

    // Add all the content for the new game
    public newGame() {
        const ball = new BallEntity(this.serviceLocator);
        this.serviceLocator.getWorld().addEntity(ball);

        this.camera = {
            position: {
                x: 0,
                y: 0
            },
            height: 0,
            angle: 0,
            fov: FOV,
            aspectRatio: ASPECT_RATIO,
            zNear: ZNEAR,
            zFar: ZFAR,
        }
        this.serviceLocator.getRenderService().attachCamera(() => this.camera);
    }

    public resumeGame() {
        this.serviceLocator.getInputService().setInputState(InputState.DEFAULT);
        this.game.setUpdateWorld(true);
        this.serviceLocator.getAudioService().play(
            this.serviceLocator.getResourceManager().manifest.audio[randomSelection([Audios.START])],
            undefined,
            undefined,
        );
    }
}
