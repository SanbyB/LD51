export const GAME_NAME = "LD51";

export const MINOR = "1";
export const PHASE = "0";
export const MAJOR = "1";
export const VERSION = `V${MAJOR}.${PHASE}.${MINOR}`;

export const DOM_WIDTH = 1280;
export const DOM_HEIGHT = 680;
export const RES_DIV = 4
export const WIDTH = DOM_WIDTH / RES_DIV;
export const HEIGHT = DOM_HEIGHT / RES_DIV;

export const ASPECT_RATIO = DOM_WIDTH / DOM_HEIGHT;
export const FOV = 45;
export const ZNEAR = 0;
export const ZFAR = 10000;

export const TARGET_FPS = 60;
export const TARGET_MILLIS = Math.floor(1000 / TARGET_FPS);

export const DEFAULT_PLAYER_HEIGHT = 0.5;
export const DEFAULT_PLAYER_RADIUS = 0.5;

export const SCENERY_PIXEL_DENSITY = 10;

export const IS_DEV_MODE = () => false;
// export const IS_DEV_MODE = () => false;

// Each tile is 64x64 pixels
export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 32;


// Increase this to make character animation faster
export const CHARACTER_ANIMATION_MULTIPLIER = 0.1;
export const CHARACTER_ANIMATION_SPEED_THRESHOLD = 0.01;
