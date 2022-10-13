# LD51

Repository for Ludum Dare 51 entry

## Web link:
https://www.da-bomb.co.uk/

## Quick start guide

Install the necessary requirements:

* https://www.npmjs.com/

Build game dependencies

```
npm install
```

Test your changes locally by running this command

```
sh build_dev.sh
```

You can then visit `http://localhost` to play the game. Any changes made will be automatically built. Refreshing the browser will sync new changes.

## Running with docker

```
docker image build . --tag ld51

// Windows
docker run --interactive --mount type=bind,source=%cd%,target=/workspace -p 1234:80 ld51

// Macos & Linux
docker run --interactive --mount type=bind,source="$(pwd)",target=/workspace -p 1234:80 ld51
```

Open the container with vscode remote containers extension:

https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers

```
cd /workspace
npm install
sh build_docker.sh
```

Then navigate to http://localhost:1234

## Folder Structure

* res
    * graphics - folder containing all the images/animations used by the game. The `CompileArt` script compiles this into a single png and placed into the `site/public/img` folder
* site
    * public
        * audio - Contains all the audio used by the game
            * background - Contains the background song audios
        * img
    * src
        * client - Contains all the code ran on the web page (incl game)
        * server - All the code used to run the test server
        * scripts - Contains script to compile art into one image

