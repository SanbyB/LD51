import { Actions } from "../Actions";
import { GameScript } from "../GameScript";
import { World } from "../engine/World";
import { Game } from "../Game";
import { ResourceManager } from "../resources/ResourceManager";
import { State } from "../ui/State";
import { Store } from "@cimacmillan/refunc";
import { AudioService } from "./audio/AudioService";
import { InputService } from "./input/InputService";
import { ParticleService } from "./particle/ParticleService";
import { RenderService } from "./render";

export class ServiceLocator {
    public constructor(
        private game: Game,
        private resourceManager: ResourceManager,
        private world: World,
        private renderService: RenderService,
        private audioService: AudioService,
        private store: Store<State, Actions>,
        private gameScript: GameScript,
        private inputService: InputService,
        private particleService: ParticleService,
    ) {}

    public getGame() {
        return this.game;
    }

    public getResourceManager() {
        return this.resourceManager;
    }

    public getWorld() {
        return this.world;
    }

    public getRenderService() {
        return this.renderService;
    }

    public getAudioService() {
        return this.audioService;
    }

    public getStore() {
        return this.store;
    }

    public getScriptingService() {
        return this.gameScript;
    }

    public getInputService() {
        return this.inputService;
    }

    public getParticleService() {
        return this.particleService;
    }
}
