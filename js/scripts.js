// Business logic
function Player(name) {
  this.name = name;
  this.score = 0;
}

var rollDie = function() {
  return Math.floor(6 * Math.random()) + 1;
};

// Interface logic
$(document).ready(function() {
  $("button#roll").click(function() {
    $("#die-roll p").text(rollDie().toFixed());
  });
});
