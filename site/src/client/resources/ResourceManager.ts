import { Actions } from "../Actions";
import { loadSound } from "../services/audio/AudioService";
import { State } from "../ui/State";
import { Store } from "@cimacmillan/refunc";
// import { setLoadPercentage } from "../ui/actions/GameStartActions";
import { defaultManifest, SpriteSheets } from "./manifests/Resources";
import { loadSpriteSheet } from "./TextureLoader";
import { LoadedManifest, ResourceManifest } from "./Types";

export class ResourceManager {
    public manifest: LoadedManifest;

    public async load(
        gl: WebGLRenderingContext,
        audio: AudioContext,
        store: Store<State, Actions>
    ) {
        this.manifest = await this.loadManifest(
            gl,
            audio,
            defaultManifest,
            (percentage: number) => store.getActions().setGameLoadPercentage(percentage)
        );
    }

    public async loadManifest(
        gl: WebGLRenderingContext,
        audio: AudioContext,
        manifest: ResourceManifest,
        setPercentage: (percentage: number) => void
    ) {
        setPercentage(0);
        const total =
            Object.keys(manifest.audio).length +
            Object.keys(manifest.spritesheets).reduce(
                (prevValue: number, next: string) => {
                    return (
                        prevValue + 1
                    );
                },
                0
            );
        let current = 0;
        const increment = () => {
            current++;
            setPercentage(current / total);
        };

        const loadedManifest: LoadedManifest = {
            spritesheets: {},
            audio: {},
        };

        for (const key in manifest.audio) {
            loadedManifest.audio[key] = await loadSound(
                manifest.audio[key].url,
                audio,
                manifest.audio[key].metadata
            );
            increment();
        }

        for (const key in manifest.spritesheets) {
            const spritesheetManifest = manifest.spritesheets[key];
            const [sheet, json] = await loadSpriteSheet(
                gl,
                spritesheetManifest
            );
            loadedManifest.spritesheets[key] = sheet;
            for (const key in json) {
                if (!json[key].frames) {
                    sheet.registerSprite(
                        key,
                        json[key].width,
                        json[key].height,
                        json[key].x,
                        json[key].y
                    );
                } else {
                    sheet.registerAnimation(
                        key,
                        json[key].width / json[key].frames,
                        json[key].height,
                        json[key].x,
                        json[key].y,
                        json[key].frames,
                        false
                    );
                }
            }
            increment();
        }

        return loadedManifest;
    }

    public getDefaultSpriteSheet() {
        return this.manifest.spritesheets[SpriteSheets.SPRITE]
    }
}
