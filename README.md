# LD51

Repository for Ludum Dare 51 entry

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

## Folder Structure

* res
    * graphics - folder containing all the images/animations used by the game. The `CompileArt` script compiles this into a single png and placed into the `site/public/img` folder
* site
    * public
        * audio
        * img
    * src
        * client
        * server
        * scripts

