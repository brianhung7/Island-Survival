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
    //Check properties after each update

Morph your pet at certain ages.
    //At specific ages, change avatar to an older version
        //Icebox
            -Add new skills/change skills at older ages

Animate your pet across the screen while it's alive.
    //Add some animations with css
*/

/*
    -Sleep -Increase health by 25, increases hunger and thirst by 2
    -Forage decrease hunger level by 2
    -Hunt sets hunger level to 1 but has a chance of taking 1-15 damage
    -Medicinal herbs increases health by 25 and lowers hunger by 1, increase thirst by 3
    -Drink decreases thirst by 3 
    -Escape only appears after 30 years and will end the game, player wins.
*/

/* TODO TODAY
    Add timer that increments age by 1 every 5 seconds --
    Add metric check in case metric surpasses boundary, game over
    Add welcome screen for name entry, put name on left side next to bart. --
    Add Tooltips for buttons, what they do --
*/

/* TODO Wednesday
    Convert to class
*/


const player = {
    name: "Brian",
    health: 100,
    hungerLevel: 5,
    thirstLevel: 5,
    years: 1,
    monthNum: 0,
    monthArr: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    isTeen: false,
    isAdult: false,
    //Methods
    startGame() {
        clearInterval(this.timer);
        player.startTimer();
        player.initButtons();
        //Hide welcome screen, show main gameplay 
        $(".container_welcome").addClass("hidden");
        $(".container").removeClass("hidden");
        //Setting Player name and welcoming them
        player.name = $("#name").val();
        $("#name_display").text(`Good luck ${player.name}!`);
        $("#event_log").prepend($(`<br> Welcome ${player.name}! Unfortunately your vacation flight to Hawaii has crashed on a remote island, do your best to survive to 10 years!</br><br />`));
    },
    startNewGame() {
        $("button").off();
        player.health = 100;
        player.hungerLevel = 5;
        player.thirstLevel = 5;
        player.years = 1;
        player.monthNum = 0;
        player.isAdult = false;
        player.isTeen = false;
        player.startGame();
        $("#avatar_bart").attr("src", "imgs/bart.png");
    },
    sleep() {
        player.health += 25;
        if (player.health > 100) {
            player.health = 100;
        }
        player.hungerLevel += 2;
        if (player.hungerLevel > 10) {
            player.hungerLevel = 10;
        }
        player.thirstLevel += 2;
        if (player.thirstLevel > 10) {
            player.thirstLevel = 10;
        }
        $("#current_event").css("background-image", "url('imgs/bartSleep.png')");
        //Call metric check here

        //Call function to update DOM
        $("#event_log").prepend($(`<br> Slept. <br> Gained 25 health, hunger and thirst increased by 2.</br> </br>`));
        player.updateMetricsDOM();
        $(".metric.health,.metric.hunger,.metric.thirst").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
    },
    forage() {
        player.hungerLevel -= 2;
        if (player.hungerLevel < 1) {
            player.hungerLevel = 1;
        }
        $("#current_event").css("background-image", "url('imgs/bartForage.gif')");
        //Call function to update DOM
        
        $("#event_log").prepend($("<br> Foraged.  <br>Hunger decreased by 2.</br> </br>"));
        player.updateMetricsDOM();
        $(".metric.hunger").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
    },
    hunt() {
        player.hungerLevel = 1
        let damage = Math.floor(Math.random() * 15);
        player.health -= damage;
        $("#current_event").css("background-image", "url('imgs/bartHunt.gif')");
        //Call metric check here

        //Call function to update DOM
        
        $("#event_log").prepend($(`<br> Hunted. Hunger level set to 1. <br>Took <b class = 'red_text'>${damage} damage </b>  from fighting an island boar.</br> </br>`));
        player.updateMetricsDOM();
        $(".metric.hunger,.metric.health").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
    },
    medicine() {
        player.health += 25;
        if (player.health > 100) {
            player.health = 100;
        }
        player.hungerLevel -= 1;
        if (player.hungerLevel < 1) {
            player.hungerLevel = 1;
        }
        player.thirstLevel += 3;
        if (player.thirstLevel > 10) {
            player.thirstLevel = 10;
        }
        $("#current_event").css("background-image", "url('imgs/medicine2.png')");
        //Call Metric check here

        //Call function to update DOM
        
        $("#event_log").prepend($("<br> Took Medicine. <br>Gained 25 health. Thirst level increased by 3. Hunger Level decreased by 1.</br> </br>"));
        player.updateMetricsDOM();
        $(".metric.hunger,.metric.thirst,.metric.hunger").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
    },
    drink() {
        player.thirstLevel -= 3;
        if (player.thirstLevel < 1) {
            player.thirstLevel = 1;
        }
        $("#current_event").css("background-image", "url('imgs/bartDrink2.png')");
        //Call function to update DOM
        
        $("#event_log").prepend($("<br> Drank water. <br> Thirst level decreased by 3.</br> </br>"));
        player.updateMetricsDOM();
        $(".metric.thirst").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
    },
    escape() {
        //$("#event_log").prepend($("<br> Attempted Escape </br>"));
        if (player.years >= 10) {
            $("#event_log").prepend($(`<br> Successfully escaped after ${player.years} years! You won! </br>`));
            $("#current_event").css("background-image", "url('imgs/escapeSuccess.gif')");
            player.gameOverWin();
        } else {
            $("#event_log").prepend($(`<br> Failed escape, try again later! That will cost you. <b class = 'red_text'>Took XX damage, Hunger Level increased by XX, Thirst Level increased by XX </b></br>`));
            $("#current_event").css("background-image", "url('imgs/escapeFail.gif')");
            $(".metric.hunger,.metric.thirst,.metric.hunger").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
        }
        

    },
    updateMetricsDOM() {
        $(".metric.health").text(`Health: ${player.health}`);
        $(".metric.hunger").text(`Hunger Level: ${player.hungerLevel}`);
        $(".metric.thirst").text(`Thirst Level: ${player.thirstLevel}`);
        $(".metric.years").text(`Years On Island: ${player.years}`);
        $(".metric.month").text(`Month: ${player.monthArr[this.monthNum]}`);
        player.checkMetrics();
    },
    checkMetrics() {
        if (player.health <= 0) {
            $("#event_log").prepend(`<br> ${player.name}'s Health reached 0, you lose!</br>`);
            player.gameOverLose();
        } else if (player.hungerLevel >= 10) {
            $("#event_log").prepend(`<br> ${player.name}'s Hunger Level reached 10, you lose!</br>`);
            player.gameOverLose();
        } else if (player.thirstLevel >= 10) {
            $("#event_log").prepend(`<br> ${player.name}'s Thirst Level reached 10, you lose!</br>`);
            player.gameOverLose();
        }
    },
    timer: null,
    startTimer() {
        this.timer = setInterval(this.increaseTime, 1000);
    },
    increaseTime() {
        player.monthNum++;
        if (player.monthNum >= player.monthArr.length) {
            player.years++;
            player.monthNum = 0;
        }
        player.updateMetricsDOM();
        if (player.years >= 5 && player.years < 10 && player.isTeen == false) {
            $("#avatar_bart").attr("src", "imgs/teenBart.png")
            $("#event_log").prepend(`<br> ${player.name} has grown up into a teenager!</br>`);
            //Need the following to so it doesn't keep repeating in the event log
            player.isTeen = true;
        } else if (player.years >= 10 && player.isAdult == false) {
            $("#avatar_bart").attr("src", "imgs/oldBart.png");
            $("#event_log").prepend(`<br> ${player.name} has grown up into a full-fledged adult!</br>`);
            player.isAdult = true;
        }
    },
    gameOverLose() {
        $("button").text("Rest in Peace");
        $("button").off();
        $("#escape_button").on("click", player.startNewGame);
        $("#escape_button").text("Try again!");
        $("#event_log").prepend(`Game over!`);
        $("#avatar_bart").attr("src", "imgs/RIP.png");
        clearInterval(player.timer);
    },
    gameOverWin() {
        $("button").text("Trip to Hawaii!");
        $("button").on("click", player.startNewGame); 
        $("#event_log").prepend(`You won the game! Now go ahead and enjoy your new prize of a trip to Hawaii! `);
        clearInterval(player.timer);
    },
    initButtons() {
        $("#sleep_button").on("click", player.sleep);
        $("#hunt_button").on("click", player.hunt);
        $("#drink_button").on("click", player.drink);
        $("#forage_button").on("click", player.forage);
        $("#medicine_button").on("click", player.medicine);
        $("#escape_button").on("click", player.escape);
        $("#sleep_button").text("Sleep");
        $("#hunt_button").text("Hunt");
        $("#drink_button").text("Drink");
        $("#forage_button").text("Forage");
        $("#medicine_button").text("Medicinal Herbs");
        $("#escape_button").text("Escape");
    },

};


$("#start_game_button").on("click", player.startGame);



//FADES METRICS IN AND OUT , ADD LATER FOR BONUS
//$(".metric").fadeTo('slow', 0.3).fadeTo('slow', 1.0);;