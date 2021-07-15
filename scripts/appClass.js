/**Instatiate your Tomagotchi

Display a character of your choice on the screen to represent your pet
    -Take in an argument for the name of the player and display it in the "character" box
    -Display an avatar representing the player in the character box below the character name
    //Icebox
        -update avatar picture to match the status level (hunger/age/thirst/health) or character
        

Display the following metrics for your pet=
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
    //Add difficulty levels

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
    Add metric check in case metric surpasses boundary, game over --
    Add welcome screen for name entry, put name on left side next to bart. --
    Add Tooltips for buttons, what they do --
*/

/* TODO Wednesday
    README --
    Add animation to avatar --
    Convert to class--
    Add metric adjustment on time change function --
    Add  metric progress bars--
*/

/* TODO THursday
    Start live website
    Check for bugs, test everything
    Add in image selector for bart or lisa avatars on welcome screen
    Add JS to take in this selector and change class property
*/

imgs = {
    bart: {
        avatar: "imgs/bart.png",
        sleep: "imgs/bartSleep.png",
        forage: "imgs/bartForage.gif",
        hunt: "imgs/bartHunt.gif",
        drink: "imgs/bartDrink2.png",
        teen: "imgs/teenBart.png",
        old: "imgs/oldBart.png",
        medicine: "imgs/medicine2.png",
    },
    lisa: {
        avatar: "imgs/lisaAvatar.png",
        sleep: "imgs/lisaSleep.gif",
        forage: "imgs/lisaForage.gif",
        hunt: "imgs/lisaHunt.png",
        drink: "imgs/lisaDrink.png",
        teen: "imgs/teenLisa.png",
        old: "imgs/adultLisa.png",
        medicine: "imgs/medicine2.png",
    },
}
class Wilson {
    constructor(name) {
        this.playerName = name;
        this.health = 100;
        this.hungerLevel = 1;
        this.thirstLevel = 1;
        this.years = 1;
        this.monthNum = 0;
        this.monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthLengthSeconds = 1000;
        this.timer = null;
    }
    startGame() {
        clearInterval(this.timer);
        this.startTimer();
        this.initButtons();
        //Hide welcome screen, show main gameplay 
        $(".container_welcome").addClass("hidden");
        $(".container").removeClass("hidden");
        //Setting Player name and welcoming them
        //this.playerName = $("#name").val();
        $("#name_display").text(`Good luck ${this.playerName}!`);
        $("#event_log").prepend($(`<br> Welcome ${this.playerName}! Unfortunately some Tokyo Olympic Volleyball players spiked you to a deserted island. Try to stay alive for 10 years before escaping!</br><br />`));
        $("#avatar_bart").attr("src", "imgs/wilsonBall.png");
        $("#current_event").css("background-image", "url('imgs/ballWelcome.gif')");
        this.updateMetricsDOM();
    };
    initButtons() {
        $("#sleep_button").text("Sleep");
        $("#hunt_button").text("Hunt");
        $("#drink_button").text("Drink");
        $("#forage_button").text("Forage");
        $("#medicine_button").text("Medicinal Herbs");
        $("#escape_button").text("Escape");
        $("#sleep_button").on("click", this.roll);
        $("#hunt_button").on("click", this.roll);
        $("#drink_button").on("click", this.roll);
        $("#forage_button").on("click", this.roll);
        $("#medicine_button").on("click", this.roll);
        $("#escape_button").on("click", this.escape);
    };
    updateMetricsDOM() {
        $(".metric.years").text(`Years On Island= ${this.years}`);
        $(".metric.month").text(`Month= ${this.monthArr[this.monthNum]}`);
        $(".metric.health")[0].firstChild.data = `Health= ${this.health}`;
        $(".metric.hunger")[0].firstChild.data = `Hunger Level= ${this.hungerLevel}`;
        $(".metric.thirst")[0].firstChild.data = `Thirst Level= ${this.thirstLevel}`;
        $("#health_meter").css("width", `${this.health}%`);
        $("#hunger_meter").css("width", `${this.hungerLevel * 10}%`);
        $("#thirst_meter").css("width", `${this.thirstLevel * 10}%`);
    };
    startTimer() {
        this.timer = setInterval(this.increaseTime, this.monthLengthSeconds);
    };
    increaseTime = () => {
        this.monthNum++;
        if (this.monthNum >= this.monthArr.length) {
            this.years++;
            this.monthNum = 0;
        }
        /*
        if (this.years >= 5 && this.years < 10 && this.monthNum == 0) {
            $("#event_log").prepend(`<br> ${this.playerName} has grown up into a teenager! Now that you are older, time will pass by faster!</br>`);
            this.monthLengthSeconds = 800;
            clearInterval(this.timer);
            this.startTimer();
        } else if (this.years >= 10 && this.monthNum == 0) {
            $("#event_log").prepend(`<br> ${this.playerName} has grown up into a full-fledged adult! As an adult, time flies by even faster</br>`);
            this.monthLengthSeconds = 500;
            clearInterval(this.timer);
            this.startTimer();
        };
        */
        this.updateMetricsDOM();
    };
    escape = () => {
        if (this.years >= 10) {
            $("#event_log").prepend($(`<br> Successfully escaped after ${this.years} years! You won! See you space cowboy! </br>`));
            $("#current_event").css("background-image", "url('imgs/escapeSuccess.gif')");
            this.gameOverWin();
        } else {
            $("#event_log").prepend($(`<br> Failed escape, try again later! That will cost you.</br>`));
            $("#current_event").css("background-image", "url('imgs/escapeFail.gif')");
            //$(".metric.health,.metric.thirst,.metric.hunger").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
        }
    };
    roll = () => {
        $("#event_log").prepend($(`<br>Try as you might but you can't do anything but roll! <b class='good_text'>You rolled for ${Math.floor(Math.random() * 50)} miles</b></br>`));
        $("#current_event").css("background-image", "url('imgs/ballGif.gif')");
    };
    gameOverWin = () => {
        $("button").text("Trip to Olympics!");
        $("button").off();
        $("button").on("click", function(){
            $("#current_event").css("background-image","url('imgs/ballWin.gif')");
        });
        $("#event_log").prepend(`<b class='good_text'>You won the game! Now go ahead and enjoy your new prize of a trip to the Tokyo Olympics!</b>`);
        clearInterval(this.timer);
    };
}

class Player extends Wilson {
    constructor() {
        super();
        this.monthLengthSeconds = 5000;
        this.isTeen = false;
        this.isAdult = false;
        this.char = 'bart';
    }
    //Methods
    startGame() {
        clearInterval(this.timer);
        this.startTimer();
        this.initButtons();
        this.char = $('.input_img.selected').val();
        //Hide welcome screen, show main gameplay 
        $(".container_welcome").addClass("hidden");
        $(".container").removeClass("hidden");
        //Setting Player name and welcoming them
        this.playerName = $("#name").val();
        $("#name_display").text(`${this.playerName}`);
        $("#event_log").prepend($(`<br> Welcome ${this.playerName}! Unfortunately your vacation flight to Hawaii has crashed on a remote island, do your best to survive to 10 years! Keep your health above 0, and your Thirst and Hunger levels below 10!</br><br />`));
        $("#avatar_bart").attr("src", imgs[this.char].avatar);
        $("#current_event").css("background-image", "url('imgs/welcomeIsland.gif')");
        this.updateMetricsDOM();
    };
    //Needed to reset game board to clean state
    startNewGame = () => {
        $("button").off();
        this.health = 100;
        this.hungerLevel = 1;
        this.thirstLevel = 1;
        this.years = 1;
        this.monthNum = 0;
        this.monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthLengthSeconds = 5000;
        this.isAdult = false;
        this.isTeen = false;
        $("#avatar_bart").attr("src", imgs[this.char].avatar);
        $("#avatar_bart").css("animation-iteration-count", "infinite");
        $("#current_event").css("background-image", "url('imgs/welcomeIsland.gif')");
        this.startGame();
    };
    updateMetricsDOM() {
        $(".metric.years").text(`Years On Island= ${this.years}`);
        $(".metric.month").text(`Month= ${this.monthArr[this.monthNum]}`);
        $(".metric.health")[0].firstChild.data = `Health= ${this.health}`;
        $(".metric.hunger")[0].firstChild.data = `Hunger Level= ${this.hungerLevel}`;
        $(".metric.thirst")[0].firstChild.data = `Thirst Level= ${this.thirstLevel}`;
        $("#health_meter").css("width", `${this.health}%`);
        $("#hunger_meter").css("width", `${this.hungerLevel * 10}%`);
        $("#thirst_meter").css("width", `${this.thirstLevel * 10}%`);
        this.checkMetrics();
    };
    sleep = () => {
        this.health += 25;
        if (this.health > 100) {
            this.health = 100;
        }
        this.hungerLevel += 2;
        if (this.hungerLevel > 10) {
            this.hungerLevel = 10;
        }
        this.thirstLevel += 2;
        if (this.thirstLevel > 10) {
            this.thirstLevel = 10;
        }
        $("#current_event").css("background-image", `url(${imgs[this.char].sleep})`);
        //Call function to update DOM
        $("#event_log").prepend($(`<br> Slept. <br> <b class='good_text'>Gained 25 health</b>, <b class='red_text'> hunger and thirst increased by 2.</b></br> </br>`));
        this.updateMetricsDOM();
        $(".metric.health,.metric.hunger,.metric.thirst").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
    };
    forage = () => {
        this.hungerLevel -= 2;
        if (this.hungerLevel < 1) {
            this.hungerLevel = 1;
        }
        $("#current_event").css("background-image", `url(${imgs[this.char].forage})`);
        //Call function to update DOM
        $("#event_log").prepend($("<br> Foraged.  <br><b class='good_text'> Hunger decreased by 2.</b></br> </br>"));
        this.updateMetricsDOM();
        $(".metric.hunger").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
    };
    hunt = () => {
        this.hungerLevel = 1
        let damage = Math.floor(Math.random() * 15);
        this.health -= damage;
        $("#current_event").css("background-image", `url(${imgs[this.char].hunt})`);

        //Call function to update DOM
        $("#event_log").prepend($(`<br> Hunted. <b class='good_text'>Hunger level set to 1.</b> <br>Took <b class = 'red_text'>${damage} damage </b>  from fighting an island boar.</br> </br>`));
        this.updateMetricsDOM();
        $(".metric.hunger,.metric.health").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
    };
    medicine = () => {
        this.health += 25;
        if (this.health > 100) {
            this.health = 100;
        }
        this.hungerLevel -= 1;
        if (this.hungerLevel < 1) {
            this.hungerLevel = 1;
        }
        this.thirstLevel += 3;
        if (this.thirstLevel > 10) {
            this.thirstLevel = 10;
        }
        $("#current_event").css("background-image", `url(${imgs[this.char].medicine})`);

        //Call function to update DOM
        $("#event_log").prepend($(`<br> Took Medicine. <br><b class='good_text'>Gained 25 health. Hunger Level decreased by 1.</b>. <b class='red_text'> Thirst level increased by 3</b>. </br> </br>`));
        this.updateMetricsDOM();
        $(".metric.health,.metric.thirst,.metric.hunger").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
    };
    drink = () => {
        this.thirstLevel -= 3;
        if (this.thirstLevel < 1) {
            this.thirstLevel = 1;
        }
        $("#current_event").css("background-image", `url(${imgs[this.char].drink})`);
        //Call function to update DOM
        $("#event_log").prepend($("<br> Drank water. <br> <b class='good_text'>Thirst level decreased by 3</b>.</br> </br>"));
        this.updateMetricsDOM();
        $(".metric.thirst").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
    };
    escape = () => {
        if (this.years >= 10) {
            $("#event_log").prepend($(`<br> Successfully escaped after ${this.years} years! You won! </br>`));
            $("#current_event").css("background-image", "url('imgs/escapeSuccess.gif')");
            this.gameOverWin();
        } else {
            $("#event_log").prepend($(`<br> Failed escape, try again later! That will cost you. <b class = 'red_text'>Took 25 damage, Hunger Level increased by 3, Thirst Level increased by 3 </b></br>`));
            this.health -= 25;
            this.hungerLevel += 3;
            if(this.hungerLevel > 10){
                this.hungerLevel = 10;
            };
            this.thirstLevel += 3;
            if(this.thirstLevel > 10){
                this.thirstLevel = 10;
            };
            $("#current_event").css("background-image", "url('imgs/escapeFail.gif')");
            $(".metric.health,.metric.thirst,.metric.hunger").fadeTo('slow', 0.2).fadeTo('slow', 1.0);;
        }
        this.updateMetricsDOM();
    };
    checkMetrics = () => {
        if (this.health <= 0) {
            $("#event_log").prepend(`<br> ${this.playerName}'s <b class = 'red_text'>Health reached 0, you lose!</b></br>`);
            this.gameOverLose();
        } else if (this.hungerLevel >= 10) {
            $("#event_log").prepend(`<br> ${this.playerName}'s <b class = 'red_text'>Hunger Level reached 10, you lose!</b></br>`);
            this.gameOverLose();
        } else if (this.thirstLevel >= 10) {
            $("#event_log").prepend(`<br> ${this.playerName}'s <b class = 'red_text'>Thirst Level reached 10, you lose!</b></br>`);
            this.gameOverLose();
        }
    };
    startTimer() {
        this.timer = setInterval(this.increaseTime, this.monthLengthSeconds);
    };
    increaseTime = () => {
        this.monthNum++;
        if (this.monthNum >= this.monthArr.length) {
            this.years++;
            this.monthNum = 0;
        }
        this.updateMetricsDOM();
        if (this.years >= 5 && this.years < 10 && this.isTeen == false) {
            $("#avatar_bart").attr("src", imgs[this.char].teen);
            $("#event_log").prepend(`<br> ${this.playerName} has grown up into a teenager! Now that you are older, time will pass by faster!</br>`);
            this.monthLengthSeconds -= 1000;
            clearInterval(this.timer);
            this.startTimer();
            //Need the following so it doesn't keep repeating in the event log
            this.isTeen = true;
        } else if (this.years >= 10 && this.isAdult == false) {
            $("#avatar_bart").attr("src", imgs[this.char].old);
            $("#event_log").prepend(`<br> ${this.playerName} has grown up into a full-fledged adult! As an adult, time flies by even faster, months are shorter so keep an eye on your metrics!</br>`);
            this.monthLengthSeconds -= 1000;
            clearInterval(this.timer);
            this.startTimer();
            //Need the following so it doesn't keep repeating in the event log
            this.isAdult = true;
        };
        if (this.monthNum % 3 === 0) { //For purposes of having enough time to talk about project, change divide by 2 to something else
            this.timedMetricDecrease();
        }
    };
    timedMetricDecrease = () => {
        this.health -= 10;
        this.thirstLevel++;
        this.hungerLevel++;
        this.updateMetricsDOM();
    };
    gameOverLose = () => {
        $("button").text("Rest in Peace");
        $("button").off();
        $("#escape_button").on("click", this.startNewGame);
        $("#escape_button").text("Try again!");
        $("#event_log").prepend(`Game over!`);
        $("#avatar_bart").attr("src", "imgs/RIP.png");
        $("#avatar_bart").css("animation-iteration-count", "0");
        $("#current_event").css("background-image","url('imgs/reaper.png')");
        clearInterval(this.timer);
    };
    gameOverWin = () => {
        $("button").text("Trip to Hawaii!");
        $("button").on("click", this.startNewGame);
        $("#event_log").prepend(`<b class = 'good_text'> You won the game! Now go ahead and enjoy your new prize of a trip to Hawaii!</b> `);
        clearInterval(this.timer);
    };
    initButtons() {
        $("#sleep_button").on("click", this.sleep);
        $("#hunt_button").on("click", this.hunt);
        $("#drink_button").on("click", this.drink);
        $("#forage_button").on("click", this.forage);
        $("#medicine_button").on("click", this.medicine);
        $("#escape_button").on("click", this.escape);
        $("#sleep_button").text("Sleep");
        $("#hunt_button").text("Hunt");
        $("#drink_button").text("Drink");
        $("#forage_button").text("Forage");
        $("#medicine_button").text("Medicinal Herbs");
        $("#escape_button").text("Escape");
    };

};


$('.input_img').on("click",function(){
    $('.selected').removeClass('selected'); // removes the previous selected class
    $(this).addClass('selected'); // adds the class to the clicked image
 });

let player = null;
document.querySelector("#start_game_button").onclick = function () {
    if ($("#name").val() == "Wilson") {
        player = new Wilson($("#name").val());
        player.startGame();
    } else {
        player = new Player($("#name").val());
        player.startGame();
    }
}
