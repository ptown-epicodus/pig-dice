// Business logic
var players = [];

function Player(name) {
  this.name = name;
  this.score = 0;
}

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

    displayPlayers();
  });

  $("button#start-game").click(startGame);

  $("button#roll").click(function() {
    $("#die-roll p").text(rollDie().toFixed());
  });
});

var displayPlayers = function() {
  $("ol#players").empty();
  players.forEach(function(element) {
    $("ol#players").append("<li id='player'>" + element.name + " (" + element.score.toFixed() + ")</li>");
  });
};

var startGame = function() {
  $("form#new-player").hide();
  $("button#start-game").hide();
  $("#table").show();
};
