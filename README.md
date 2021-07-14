# Island Survival (Tomagotchi)
==Wireframes==

<img src="imgs/wireframeWelcome.png" alt="Welcome Wireframe">
<img src="imgs/wireframeMain.png" alt="Gameplay Wireframe">

<h2>==Goal==</h2>
Create a game where you crashed on an island and have to survive by managing health, thirst, and hunter to 10 years before escaping to win.

<h2>==Technologies Used==</h2>
HTML, CSS, Javascript, jQuery

<h2>==Approach Taken==</h2>
<li>Javascript code is written using a player object with several methods that will interact with the DOM</li>
<li>-ICEBOX, convert javascript code to using classes</li>

<h2>==User Stories==</h2>
<li>Player/user is presented with a welcome screen with basic instructions and name entry before Play </li>
<li>After beginning the game, player sees several metrics on the top bar that they have to manage, keeping Health above 0 and Thirst/Hunger Levels lower than 10. </li>
<li>Player has several buttons on the bottom of the game screen that will call various functions on that affect metrics </li>
<li>As time progresses, Health will decrease and Thirst/Hunger will increase at a set interval</li> 
<li>Some buttons will have both positive and negative effects </li>
<li>Trying to escape before reaching the minimum years will punish the player. </li>
<li>Successful escape will generate a win screen while failing a metric check (exceeding metric limit) will be a game over. </li>

<h2>==IceBox==</h2>
<li>Update avatar at certain milestones</li>
     <li>Add effect to signify aging to new avatar</li>
<li>Animate various activities</li>
<li>When a metric is changed/modified, flash the respective metric to alert player something happened.</li>
<li>On Game Over loss or win, add option to restart the game</li>
<li>Add event log to keep track of events/actions</li>
        <li>Colorize positive/negative events</li>
<li>Add loading bar after an action button is pressed</li>
<li>Change javascript from using an object for the game to using classes</li>
<li>Hovering over each button will give a tooltip that says what it will affect</li>