export const GAME_NAME = "Da Bomb!";

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

export const CHARACTER_HEALTH_WIDTH = 20;
export const CHARACTER_HEALTH_HEIGHT = 2;
export const CHARACTER_HEALTH_SHOWN = 2000;

export const CHARACTER_HAND_SIZE = 10;
export const CHARACTER_HAND_DISTANCE = 10;
export const CHARACTER_LOWER_DROP = 4;
export const CHARACTER_MOUSE_DISANCE_INFLUENCE = 0.2;

export const CHARACTER_ATTACK_DISTANCE = 32;
export const CHARACTER_ATTACK_ARC = 80; // degrees
export const CHARACTER_ATTACK_BUMP_STRENGTH = 8;

export const CHARACTER_SPEAD_DIST = 30;
export const CHARACTER_FOLLOW_DIST = 60;

// The weighting of the character selection,
// higher values make it less random and more likely to follow a pattern,
// lower values make it more random
export const CHARACTER_SELECT = 1;

export const ZOMBIE_ATTACK_DISTANCE = 20;


// Bomber stats
export const BOMBER_ATTACK_STRENGTH = 2
export const BOMBER_SPEED = 1.3

// Soldier stats
export const SOLDIER_ATTACK_STRENGTH = 6
export const SOLDIER_SPEED = 1

// Scientist stats
export const SCIENTIST_ATTACK_STRENGTH = 1
export const SCIENTIST_SPEED = 0.7

// Engineer stats
export const ENGINEER_ATTACK_STRENGTH = 3
export const ENGINEER_SPEED = 1

export const PATHFIND_EVERY_FRAMES = 8;

export const CAMERA_TWEEN = 0.2;

// SOUND
export const BACKGROUND_GAIN = 0.2;
export const MACHINE_GAIN = 0.2;


export const GAME_BACKSTORY = "Your crew have boarded the ISS Last Dab. The ship has been overrun by crazed crew members, infected by a cannibalistic virus. Your mission is to gain control of the ships systems through various terminals. Use your crew's unique abilities to your advantage. However, the virus is taking hold, and only one is able to think for 10 seconds before needing rest. Good luck!";
export const GAME_LOST_TEXT = "Your crew were mercilessly killed!";
export const GAME_WON_TEXT = "You stabilised the vessel!";

