import { Actions } from "../Actions";
import { loadSound } from "../services/audio/AudioService";
import { State } from "../ui/State";
import { Store } from "@cimacmillan/refunc";
// import { setLoadPercentage } from "../ui/actions/GameStartActions";
import { defaultManifest, SpriteSheets } from "./manifests/Resources";
import { loadJson, loadSpriteSheet } from "./TextureLoader";
import { LoadedManifest, ResourceManifest } from "./Types";

export class ResourceManager {
    public manifest: LoadedManifest;

    public async load(
        audio: AudioContext,
        store: Store<State, Actions>
    ) {
        this.manifest = await this.loadManifest(
            audio,
            defaultManifest,
            (percentage: number) => store.getActions().setGameLoadPercentage(percentage)
        );
    }

    public async loadManifest(
        audio: AudioContext,
        manifest: ResourceManifest,
        setPercentage: (percentage: number) => void
    ) {
        setPercentage(0);

        const audio_json = await loadJson<{
            name: string,
            file: string
        }[]>("./manifest.json");

        const total =
            audio_json.length +
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

        for (const audio_info of audio_json) {
            loadedManifest.audio[audio_info.name] = await loadSound(
                audio_info.file,
                audio
            );
            increment();
        }

        for (const key in manifest.spritesheets) {
            const spritesheetManifest = manifest.spritesheets[key];
            const [sheet, json] = await loadSpriteSheet(
                spritesheetManifest
            );
            loadedManifest.spritesheets[key] = sheet;
            for (const key in json) {
                if (!json[key].frames) {
                    sheet.registerSprite(
                        key,
                        json[key].width - 1,
                        json[key].height - 1,
                        json[key].x,
                        json[key].y
                    );
                } else {
                    sheet.registerAnimation(
                        key,
                        json[key].width / json[key].frames - 1,
                        json[key].height - 1,
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

    public getAudio(name: string) {
        if (!this.manifest.audio[name]) {
            throw new Error(`No audio with name ${name}. Audios are ${JSON.stringify(this.manifest.audio)}`);
        }
        return this.manifest.audio[name];
    }
}
