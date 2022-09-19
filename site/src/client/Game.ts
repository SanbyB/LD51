import { Actions } from "./Actions";
import { HEIGHT, TARGET_MILLIS, WIDTH } from "./Config";
import { GameScript } from "./GameScript";
import { World } from "./engine/World";
import { ResourceManager } from "./resources/ResourceManager";
import { AudioService } from "./services/audio/AudioService";
import { InputService } from "./services/input/InputService";
import { ProcedureService } from "./services/jobs/ProcedureService";
import { ParticleService } from "./services/particle/ParticleService";
import { RenderService, ScreenBuffer } from "./services/render";

import { ServiceLocator } from "./services/ServiceLocator";
import { State } from "./ui/State";
import { Store } from "@cimacmillan/refunc";
import { logFPS, setFPSProportion } from "./util/time/GlobalFPSController";
import { TimeControlledLoop } from "./util/time/TimeControlledLoop";

export class Game {
    private serviceLocator: ServiceLocator;
    private store: Store<State, Actions>;

    private initialised: boolean = false;
    private updateWorld: boolean = false;
    private isHidden: boolean = false;

    public async init(
        openGL: WebGLRenderingContext,
        store: Store<State, Actions>
    ) {
        this.store = store;

        const audioContext = new AudioContext();
        const screen = new ScreenBuffer(openGL, WIDTH, HEIGHT);

        const resourceManager = new ResourceManager();
        await resourceManager.load(openGL, audioContext, store);

        const world = new World();

        const scriptingService = new GameScript(this);

        const inputService = new InputService();

        this.serviceLocator = new ServiceLocator(
            this,
            resourceManager,
            world,
            new RenderService(resourceManager),
            new AudioService(audioContext),
            store,
            scriptingService,
            inputService,
            new ParticleService()
        );

        this.serviceLocator.getInputService().init(this.serviceLocator);
        this.serviceLocator.getRenderService().init(screen.getOpenGL());
        this.serviceLocator.getWorld().init(this.serviceLocator);
        this.serviceLocator.getParticleService().init(this.serviceLocator);
        this.serviceLocator.getScriptingService().init(this.serviceLocator);

        this.serviceLocator.getScriptingService().newGame();

        const loop = new TimeControlledLoop(TARGET_MILLIS, this.mainLoop);
        this.initialised = true;
        this.serviceLocator.getStore().getActions().onGameInitialised();
        if (this.isHidden) {
            this.serviceLocator.getAudioService().pauseSong();
        }

        loop.start();
    }

    public isInitialised() {
        return this.initialised;
    }

    public getServiceLocator() {
        return this.serviceLocator;
    }

    public setUpdateWorld(updateWorld: boolean) {
        this.updateWorld = updateWorld;
    }

    public setIsHidden(isHidden: boolean) {
        this.isHidden = isHidden;
        if (this.serviceLocator) {
            if (isHidden) {
                this.serviceLocator.getAudioService().pauseSong();
            } else {
                this.serviceLocator.getAudioService().resumeSong();
            }
        }
    }

    private update = () => {
        this.serviceLocator.getScriptingService().update();
        this.serviceLocator.getWorld().performSync(this.serviceLocator);
        ProcedureService.update();
        if (this.updateWorld && !this.isHidden) {
            this.serviceLocator.getInputService().update();
            this.serviceLocator.getWorld().update(this.serviceLocator);
            this.serviceLocator.getParticleService().update();
            ProcedureService.gameUpdate();
        }
    };

    private draw = () => {
        this.serviceLocator.getRenderService().draw();
    };

    private mainLoop = (
        instance: TimeControlledLoop,
        actualMilliseconds: number,
        actualProportion: number,
        budgetUsage: number
    ) => {
        logFPS((fps) => {
            const result = ProcedureService.getPendingTimerCounts();
            console.log(
                `FPS: ${fps} BudgetUsage: ${Math.floor(
                    budgetUsage * 100
                )}% EntityCount: ${
                    this.serviceLocator.getWorld().getEntityArray()
                        .length
                } Intervals ${result.intervals} Timeouts ${result.timeouts}
                Particles ${
                    this.serviceLocator.getParticleService().getParticles()
                        .length
                }
                `
            );
        });
        setFPSProportion(1 / actualProportion);

        this.update();
        this.draw();
    };
}
