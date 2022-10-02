const fs = require("fs");

let site_dir = "site/public/";
let audio_dir = "audio/"
let manifest_file = "manifest.json";

function writeJson(dir, json) {
    const val = JSON.stringify(json, undefined, 4);
    fs.writeFileSync(dir, val, { flag: "w" });
}

function main() {
    console.log("CompilerAudio");

    const output = fs.readdirSync(site_dir + audio_dir)
        .map(file => audio_dir + file)
        .filter(file => file.substring(file.length - 3) == "mp3" || file.substring(file.length - 3) == "wav")
        .map(file => {
            let paths = file.split("/");
            let filename = paths[paths.length - 1];
            return {
                name: filename.substring(0, filename.length - 4),
                file: "./" + file
            }
        });

    writeJson(site_dir + manifest_file, output);

}


main();
