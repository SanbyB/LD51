import { getImageData } from "./TextureLoader";

export interface TextureCoordinate {
    textureX: number;
    textureY: number;
    textureWidth: number;
    textureHeight: number;
}

export interface Sprite {
    pixelCoordinate: TextureCoordinate;
    spriteSheetWidth: number;
    spriteSheetHeight: number;
    source: string;
}

interface SpriteHash {
    [name: string]: Sprite;
}
interface AnimationHash {
    [name: string]: Sprite[];
}

export class SpriteSheet {
    private spriteHash: SpriteHash = {};
    private animationHash: AnimationHash = {};

    public constructor(
        private width: number,
        private height: number,
        public readonly image: HTMLImageElement
    ) {}

    public registerSprite(
        name: string,
        width: number,
        height: number,
        xPixel: number,
        yPixel: number
    ) {
        this.spriteHash[name] = {
            pixelCoordinate: {
                textureX: xPixel,
                textureY: yPixel,
                textureWidth: width,
                textureHeight: height,
            },
            spriteSheetWidth: this.width,
            spriteSheetHeight: this.height,
            source: this.image.src,
        };
    }

    public registerAnimation(
        name: string,
        width: number,
        height: number,
        xPixel: number,
        yPixel: number,
        frameCount: number,
        vertical?: boolean
    ) {
        const spriteWidth = width;
        const spriteHeight = height;

        let xPos = xPixel;
        let yPos = yPixel;

        this.animationHash[name] = [];

        for (let i = 0; i < frameCount; i++) {
            this.animationHash[name].push({
                pixelCoordinate: {
                    textureX: xPos,
                    textureY: yPos,
                    textureWidth: spriteWidth,
                    textureHeight: spriteHeight,
                },
                spriteSheetWidth: this.width,
                spriteSheetHeight: this.height,
                source: this.image.src,
            });
            if (vertical) {
                yPos += spriteHeight;
            } else {
                xPos += spriteWidth;
            }
        }
    }

    public getSprite(name: string): Sprite {
        if (!this.spriteHash[name]) {
            console.log(`SpriteSheet ${name} missing`);
        }
        return this.spriteHash[name];
    }

    public getAnimationFrame(name: string, frame: number) {
        const animation = this.animationHash[name];
        if (!animation) {
            console.log(`Animation ${name} missing`);
            return;
        }

        if (frame >= animation.length) {
            return animation[animation.length - 1];
        }

        return this.animationHash[name][frame];
    }

    public getAnimationInterp(name: string, interp: number) {
        const animation = this.animationHash[name];
        if (!animation) {
            console.log(`Animation ${name} missing`);
        }
        const frame = Math.floor(interp * animation.length);
        return this.getAnimationFrame(name, frame);
    }

    public getAnimationFrameCount(name: number) {
        return this.animationHash[name].length;
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public getImage() {
        return this.image;
    }
}
