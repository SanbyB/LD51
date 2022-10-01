
* Map
    * ~~2D Grid of tiles~~
    * ~~Tile can have image or be empty + collidable~~
    * ~~Only tiles in viewport rendered~~

* Map Loader
    * ~~load PNG data in res/graphics (map.png)~~
    * ~~For R/G/B value of X, load tile with image Y (collideable vs non)~~
    * ~~For R/G/B value of X, load entity (zombie / zombie spawn point etc) switch statement~~

* Character Entity
    * ~~Draw character with animation (walk, standing still)~~
    * ~~Has health~~
    * ~~Has death image~~
    * ~~Display health bar~~
    * Hand rendering

* Controllable Character
    * Move character with input service
    * Can interact with nearby task?
    * Can attack surroundings
    * Follows primary controllable character if not controlled?
    * Scientist
        * animation
        * Easier tasks
    * Fighter
        * animation
        * Can shoot 
    * Bomber 
        * Animation
        * opens alert randomly  
    * (stretch) Mechanic
    * (stretch) not sure?
    
* Zombie Entity
    * ~~Animation is zombie~~
    * Searches for nearest character with A* or some other path finding
    * ~~Walks towards target~~
    * ~~When near, damages with animation~~
    * (stretch) variations in zombie art / size / power

* Zombie Spawn Point
    * ~~Every 10 s?~~
    * ~~Spawns a bunch of zombies with some probability~~

* Tasks
    * Simon Says
    * Number remember game
    * Reflex game
    * Random bomb alert thing
    * More?

* Game Scripting
    * Create entities from map
    * Every 10s move to different character (in cyclic but random)
    * If character dies, don't move to that character
    * After completing all tasks, win game? Or just score boost?
    * If all dying get score?
    * Ending screen
    * Starting screen
    * Restart game
    * Display score
    * (stretch) leaderboard

* UI
    * Key hints / tutorial
    * 10s countdwn / clock display

* Juice
    * Screen shake
    * Particles
        * Blood
    * Camera tween movement

* Bugs
    * ~~Image has weird lines when drawing, add padding to CompileArt~~

Engineer - Spanner
Axe - Soldier
Thermometer - Scientist
Bomber - detonator

