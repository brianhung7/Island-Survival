/**Instatiate your Tomagotchi

Display a character of your choice on the screen to represent your pet
    -Take in an argument for the name of the player and display it in the "character" box
    -Display an avatar representing the player in the character box below the character name
    //Icebox
        -update avatar picture to match the status level (hunger/age/thirst/health) or character
        

Display the following metrics for your pet:
- Hunger (1-10 scale)
- Sleepiness (1-10 scale)
- Boredom (1-10 scale)
- Age
    //Create object containing all metrics including name
    //Update/display the metric whenever it changes with jQuery

Add buttons to the screen to feed your pet, turn off the lights, and play with your pet.
    //Create objects on bottom div to perform various activities
    //Add event listeners to each button that will call a function

Add the ability to name your pet.
    //Take in an argument for the name of the player and display it in the "character" box at game start, This should be a box on top of the actual gameplay or replace it entirely before showing
        -Either remove/hide this box after clicking play or replace it 

Style the page.
    //Add an island background to the entire page
    //Center of the page should be the main gameplay area inside a rectangular box
    //Setup rows/columns for various parts of the game area

Increase your pet's age every x minutes
    //Pet ages by 1 every minute
    //Use setInterval to keep track of time, reset interval each time age goes up and increment age by 1

Increase your pet's Hunger, Sleepiness, and Bored metrics on an interval of your choosing.
    //Use setInterval to keep track of time and change metrics accordingly 

You pet should die if Hunger, Boredom, or Sleepiness hits 10.
    //If Health = 0 or Hunger, or Thirst hit 10, game ends, player dies 

Morph your pet at certain ages.
    //At specific ages, change avatar to an older version
        //Icebox
            -Add new skills/change skills at older ages

Animate your pet across the screen while it's alive.
    //Add some animations with css
*/
