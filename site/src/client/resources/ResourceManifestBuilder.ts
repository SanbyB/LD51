import { AudioMetadata } from "../services/audio/AudioObject";
import {
    AnimationManifest,
    AudioManifest,
    ResourceManifest,
    SpriteManifest,
    SpriteSheetManifest,
} from "./Types";

export class ResourceManifestBuilder implements ResourceManifest {
    public spritesheets: {
        [key: string]: string;
    } = {};
    public audio: AudioManifest = {};

    public Spritesheet(key: string, url: string) {
        this.spritesheets[key] = url;
    }

    public Audio(key: string, audio: string, metadata?: AudioMetadata) {
        this.audio[key] = {
            url: audio,
            metadata,
        };
    }

    public Builder(builder: ResourceManifestBuilder) {
        this.spritesheets = {
            ...this.spritesheets,
            ...builder.spritesheets,
        };
        this.audio = {
            ...this.audio,
            ...builder.audio,
        };
    }
}

export class SpriteSheetManifestBuilder implements SpriteSheetManifest {
    public url: string = "";
    public sprites: SpriteManifest = {};
    public animations: AnimationManifest = {};

    public constructor(url: string) {
        this.url = url;
    }

    public Sprite(
        key: string,
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        this.sprites[key] = { x, y, width, height };
    }

    public Animation(
        key: string,
        x: number,
        y: number,
        width: number,
        height: number,
        frames: number,
        vertical: boolean = false
    ) {
        this.animations[key] = { x, y, width, height, frames, vertical };
    }
}
