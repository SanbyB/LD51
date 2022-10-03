export interface ControlScheme {
    poll: (keysDown: { [key: string]: boolean }) => void;
    onKeyDown: (key: string, keysDown: { [key: string]: boolean }) => void;
    onKeyUp: (key: string, keysDown: { [key: string]: boolean }) => void;
    onMouseMove: (event: MouseEvent) => void;
    onMouseDown: (event: MouseEvent) => void;
    onMouseUp: (event: MouseEvent) => void;
    onEnter: () => void
}
