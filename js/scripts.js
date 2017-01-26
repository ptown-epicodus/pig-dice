// Business logic
var players = [];
var currentRollerIndex = 0;
var runningScore = 0;

function Player(name) {
  this.name = name;
  this.score = 0;
}

Player.prototype.accrue = function(points) {
  this.score += points;
};

Player.prototype.resetScore = function() {
  this.score = 0;
};

var rollDie = function() {
  return Math.floor(6 * Math.random()) + 1;
};

// Interface logic
$(document).ready(function() {
  $("form#new-player").submit(function(event) {
    event.preventDefault();

    var inputtedName = $("#new-name").val();
    var newPlayer = new Player(inputtedName);
    players.push(newPlayer);

    resetFields();
    displayPlayers();
    $("button#start-game").show();
  });

  $("button#start-game").click(startGame);

  $("button#roll").click(function() {
    var dieValue = rollDie();
    $("#die-roll p").text(dieValue.toFixed());
    if (dieValue === 1) {
      runningScore = 0;
      nextPlayer();
      return;
    }
    runningScore += dieValue;
    if (players[currentRollerIndex].score + runningScore >= 10) {
      players[currentRollerIndex].accrue(runningScore);
      displayPlayers();
      endGame();
    }
  });

  $("button#hold").click(function() {
    players[currentRollerIndex].accrue(runningScore);
    runningScore = 0;
    displayPlayers();
    nextPlayer();
  });
});

var resetFields = function() {
  $("#new-name").val("");
};

var displayPlayers = function() {
  $("ol#players").empty();
  players.forEach(function(element) {
    $("ol#players").append("<li id='player'>" + element.name + " (" + element.score.toFixed() + ")</li>");
  });
};

var nextPlayer = function() {
  if (currentRollerIndex + 1 < players.length)
    currentRollerIndex++;
  else
    currentRollerIndex = 0;
  $("#players li").removeClass("current");
  $("#players li").eq(currentRollerIndex).addClass("current");
};

var startGame = function() {
  $("form#new-player").hide();
  $("button#start-game").hide();
  $("#table").show();
  currentRollerIndex = 0;
  players.forEach(function(element) {
    element.resetScore();
  });
  displayPlayers();
  $("#players li").eq(currentRollerIndex).addClass("current");
};

var endGame = function() {
  $("#players li").eq(currentRollerIndex).addClass("winner");
  $("form#new-player").show();
  $("button#start-game").show();
  $("#table").hide();
};
