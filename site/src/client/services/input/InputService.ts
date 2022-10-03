import { ServiceLocator } from "../ServiceLocator";
import { ControlScheme } from "./ControlScheme";
import { DefaultControlScheme } from "./DefaultControlScheme";
import { MenuControlScheme } from "./MenuControlScheme";

export enum InputState {
    DEFAULT = "DEFAULT",
    INVENTORY = "INVENTORY",
    MENU = "MENU",
    MINIGAME = "MINIGAME",
}

/**
 * Service for handling input and window events
 * Depending on what state we're in, changes what commands
 * are fired.
 */
export class InputService {
    private keydown: { [key: string]: boolean };
    private serviceLocator: ServiceLocator;
    private controlScheme: ControlScheme;
    private inputState: InputState;

    public constructor() {
        this.keydown = {};
    }

    public init(serviceLocator: ServiceLocator) {
        this.serviceLocator = serviceLocator;
        this.setInputState(InputState.MENU);
        this.attachWindowHooks();
    }

    public update() {
        this.controlScheme.poll(this.keydown);
    }

    public setInputState = (inputState: InputState) => {
        this.inputState = inputState;
        switch (inputState) {
            case InputState.DEFAULT:
                this.controlScheme = new DefaultControlScheme(
                    this.serviceLocator
                );
                this.controlScheme.onEnter();
                break;
            case InputState.MENU:
                this.controlScheme = new MenuControlScheme(this.serviceLocator);
                this.controlScheme.onEnter();
                break;
        }
    };

    public getInputState = () => this.inputState;

    private attachWindowHooks() {
        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keyup", this.onKeyUp);
        document.getElementById("main_canvas").addEventListener("mousemove", this.onMouseMove);
        document.getElementById("main_canvas").addEventListener("mousedown", this.onMouseDown);
        document.getElementById("main_canvas").addEventListener("mouseup", this.onMouseUp);
    }

    private onKeyUp = (keyboardEvent: KeyboardEvent) => {
        this.keydown[keyboardEvent.code] = false;
        this.controlScheme.onKeyUp(keyboardEvent.code, this.keydown);
    };

    private onKeyDown = (keyboardEvent: KeyboardEvent) => {
        this.keydown[keyboardEvent.code] = true;
        this.controlScheme.onKeyDown(keyboardEvent.code, this.keydown);
    };

    private onMouseMove = (event: MouseEvent) => {
        this.controlScheme.onMouseMove(event);
    }

    private onMouseDown = (event: MouseEvent) => {
        this.controlScheme.onMouseDown(event);
    }

    private onMouseUp = (event: MouseEvent) => {
        this.controlScheme.onMouseUp(event);
    }
}
