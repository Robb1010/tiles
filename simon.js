//$(document).ready(function() {
status = "inactive";
green = new Audio("simonSound1.mp3");
blue = new Audio("simonSound2.mp3");
orange = new Audio("simonSound3.mp3");
yellow = new Audio("simonSound4.mp3");
wrong = new Audio("wrong.mp3");

task = [];
user = [];
strict = "off";
var s = [];
$("#strict").click(function() {
  if (strict === "off") {
    strict = "on";
  } else strict = "off";
});

// Asign fucntion to the start button
function startButton() {
  $("#start").click(function() {
    status === "active";
    randomTile();
    startIt();
  });
}

startButton();

function startIt() {
  $(".display").text(task.length);
  startOff();
  var k = -1;

  function cycle() {
    k++;

    function glow() {
      functions[task[k]][0](task[k]);
      window[task[k]].play();
    }

    function normal() {
      functions[task[k]][1](task[k]);
    }

    if (k === task.length - 1) {
      clearInterval(readTask);
      onHover();
      onClick();
      status = "active";
    }
    setTimeout(function() {
      glow();
    }, 50);
    setTimeout(function() {
      normal();
    }, 700);
  }
  var readTask = setInterval(function() {
    status = "inactive"
    notAllowed();
    cycle();
  }, 800);
}

// ---------------------------------------



function startOff() {
  $("#start").off("mouseenter mouseleave");
  $("#start").off("click");
}

function randomTile() {
  task.push(colors[Math.floor((Math.random() * 4))]);
}

// Assign sounds to button presses, also register button presses

var audioId = ["#green", "#blue", "#orange", "#yellow"];

function onClick() {
  for (i = 0; i < audioId.length; i++) {
    $(audioId[i]).mousedown(function() {
      window[this.id].play();
      var that = this.id;
      setTimeout(function() {
        user.push(that);
        if (user[user.length - 1] === task[user.length - 1]) {
          if (task.length === 20 && user.length === task.length) {
            $(".display").text("WIN!");
            notAllowed();
            user = [];
            task = [];
            startButton();
          } else if (user.length === task.length) {
            randomTile();
            user = [];
            startIt();
            startOff()
          }
          console.log("Correct!");
        } else {
          $(".display").text("!!!");
          notAllowed();
          window.wrong.play();

          function wrongTile() {
            lightsOut();
            user = [];
            startIt();
            startOff();
          }
          if (strict === "on") {
            task = [];
            randomTile();
            setTimeout(function() {
              wrongTile()
            }, 1000);
          }
          setTimeout(function() {
            wrongTile()
          }, 1000);
        }
      }, 500);
    });
  }
}

//--------------------------------------------

// Assign all hover and on click color and glow changes

var ids = ["#green", "#blue", "#orange", "#yellow", "#start", "#strict"];

function onHover() {
  for (i = 0; i < ids.length; i++) {
    $(ids[i]).hover(function() {
        functions[this.id][0](this.id);
      },
      function() {
        functions[this.id][1](this.id);
      });
  }
}

if (status === "active") {
  onClick();
  onHover();
}
//----------------------------------------



// Stop any presses while the game is flashing the task

function notAllowed() {
  lightsOut();
  for (i = 0; i < ids.length; i++) {
    $(ids[i]).off("mouseenter mouseleave");
  }
  for (i = 0; i < audioId.length; i++) {
    $(audioId[i]).off("mousedown");
  }
}


// -------------------------------------------


// Make sure that the glow is turning off when pressing the wrong tile
var colors = ["blue", "orange", "yellow", "green"];

function lightsOut() {
  for (i = 0; i < colors.length; i++) {
    functions[colors[i]][1](colors[i]);
  }
}

//-----------------------------------------------

// Object containing all the colors and glow colors

functions = {
  "green": {
    0: function glowGreen(target) {
      $("#" + target).css({
        "background-color": "#69cf89",
        "box-shadow": "0 0 30px #69cf89"
      });
    },

    1: function normalGreen(target) {
      $("#" + target).css({
        "background-color": "#33a356",
        "box-shadow": "0 0 15px #33a356"
      });
    }
  },

  "blue": {
    0: function glowBlue(target) {
      $("#" + target).css({
        "background-color": "#76bfe3",
        "box-shadow": "0 0 30px #76bfe3"
      });
    },

    1: function normalBlue(target) {
      $("#" + target).css({
        "background-color": "#479bc4",
        "box-shadow": "0 0 15px #479bc4"
      });
    }
  },

  "orange": {
    0: function glowOrange(target) {
      $("#" + target).css({
        "background-color": "#fbab76",
        "box-shadow": "0 0 30px #fbab76"
      });
    },

    1: function normalOrange(target) {
      $("#" + target).css({
        "background-color": "#ff6600",
        "box-shadow": "0 0 15px #ff6600"
      });
    }
  },

  "yellow": {
    0: function glowYellow(target) {
      $("#" + target).css({
        "background-color": "#ffffe0",
        "box-shadow": "0 0 30px #ffffe0"
      });
    },

    1: function normalYellow(target) {
      $("#" + target).css({
        "background-color": "#ffff66",
        "box-shadow": "0 0 15px #ffff66"
      });
    }
  },

  "start": {
    0: function glowRed(target) {
      $("#" + target).css({
        "background-color": "#de7979",
        "box-shadow": "0 0 30px #de7979"
      });
    },

    1: function normalRed(target) {
      $("#" + target).css({
        "background-color": "#c23d3d",
        "box-shadow": "0 0 15px #c23d3d"
      });
    }
  },

  "strict": {
    0: function glowYellow(target) {
      $("#" + target).css({
        "background-color": "#ffffe0",
        "box-shadow": "0 0 30px #ffffe0"
      });
    },

    1: function normalYellow(target) {
      $("#" + target).css({
        "background-color": "#ffff66",
        "box-shadow": "0 0 15px #ffff66"
      });
    }
  }
}

//-----------------------------------------








//});
