import { ResourceManifestBuilder } from "../ResourceManifestBuilder";
import { audios } from "./Audios";

export enum SpriteSheets {
    SPRITE = "SPRITE",
}

const manifest: ResourceManifestBuilder = new ResourceManifestBuilder();
manifest.Spritesheet(SpriteSheets.SPRITE, "img/out");
manifest.Builder(audios);

export const defaultManifest = manifest;
