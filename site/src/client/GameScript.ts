import { Console } from "console";
import { FOV, ASPECT_RATIO, ZNEAR, ZFAR, WIDTH, HEIGHT, BACKGROUND_GAIN } from "./Config";
import { OpenTask, TaskNames, TaskType } from "./engine/commands/TaskCommands";
import { Scientist } from "./engine/entities/Scientist";
import { Task } from "./engine/entities/Task";
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
    private gameEnd: boolean = false;
    private gameWon: boolean = false;

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

        this.serviceLocator.getAudioService().playSong("background", BACKGROUND_GAIN);
        // this.serviceLocator.getWorld().addEntity(zombie);

    }

    public resumeGame() {
        this.serviceLocator.getInputService().setInputState(InputState.DEFAULT);
        this.game.setUpdateWorld(true);
    }

    public restartGame() {
        this.newGame();
        this.resumeGame();
        this.gameEnd = false;
        this.gameWon = false;
        Zombie.zombieNumber = 0;
    }

    public onGameEnd(win: boolean) {
        if (this.gameEnd) {
            return;
        }

        this.gameEnd = true;
        this.gameWon = win;

        this.serviceLocator.getGame().setUpdateWorld(false);
        this.serviceLocator.getStore().getActions().stopGame(win);
        this.serviceLocator.getAudioService().play(
            win ? "game_won" : "game_lost"
        );
        for (let entity of this.serviceLocator.getWorld().getEntityArray()) {
            this.serviceLocator.getWorld().removeEntity(entity);
        }
        this.serviceLocator.getWorld().performSync(this.serviceLocator);
    }

    public getMap() {
        return this.gameMap;
    }
}
