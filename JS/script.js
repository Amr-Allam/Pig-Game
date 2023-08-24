"use strict";
const pointsScore = document.querySelectorAll(".points-score");
const score = document.querySelectorAll(".score");
const btn = document.querySelectorAll(".btn");
const rollButton = document.querySelector(".roll");
const holdButton = document.querySelector(".hold");
const newButton = document.querySelector(".new");
const player1Section = document.querySelector(".player1");
const player2Section = document.querySelector(".player2");
const name1 = document.querySelector(".name1");
const name2 = document.querySelector(".name2");
const dice = document.querySelector(".dice-number");
const info = document.querySelector(".info");
const rename = document.querySelectorAll(".rename");
let ptsScore = 0;
let holdScore1 = 0;
let holdScore2 = 0;
let i = 0;
name2.style.fontWeight = "400";

// ----------------------------- Button Effects -----------------------------
for (let x = 0; x < btn.length; x++) {
  // ----------------------------- Functions -----------------------------
  const buttonDown = function () {
    btn[x].style.transform = "translateY(2px)";
    btn[x].style.boxShadow = "0 2px 5px 1px rgb(0 0 0 / 30%)";
  };
  const buttonUp = function () {
    btn[x].style.transform = "translateY(0)";
    btn[x].style.boxShadow = "0 5px 5px 1px rgb(0 0 0 / 30%)";
  };
  // ----------------------------- Events -----------------------------
  btn[x].addEventListener("mousedown", function () {
    buttonDown();
  });
  btn[x].addEventListener("mouseup", function () {
    setTimeout(function () {
      buttonUp();
    }, 50);
  });
  btn[x].addEventListener("mouseout", function () {
    setTimeout(function () {
      buttonUp();
    }, 50);
  });
  // ----------------------------- For Touch Screens -----------------------------
  btn[x].addEventListener("touchstart", function () {
    buttonDown();
  });
  btn[x].addEventListener("touchend", function () {
    setTimeout(function () {
      buttonUp();
    }, 50);
  });
  btn[x].addEventListener("touchmove", function () {
    setTimeout(function () {
      buttonUp();
    }, 50);
  });
}
// --------------------------------------------------------------------------

// ----------------------------- Active Player -----------------------------
const player1active = function () {
  player1Section.style.backgroundColor = "#daaebc";
  player2Section.style.backgroundColor = "#ba7a98";
  name1.style.fontWeight = "bold";
  name2.style.fontWeight = "400";
};
const player2active = function () {
  player1Section.style.backgroundColor = "#ba7a98";
  player2Section.style.backgroundColor = "#daaebc";
  name2.style.fontWeight = "bold";
  name1.style.fontWeight = "400";
};
// -------------------------------------------------------------------------

// ----------------------------- roll button -----------------------------
rollButton.addEventListener("click", function () {
  if (score[0].textContent >= 50 || score[1].textContent >= 50) {
    return;
  }
  let roll = Math.trunc(Math.random() * 6) + 1;
  // ------------------------- dice -------------------------
  document.querySelector(".dice-empty").style.display = "none";
  dice.className = "fa-solid dice-number";
  dice.style.display = "block";
  if (roll === 1) {
    dice.classList.add("fa-dice-one");
  } else if (roll === 2) {
    dice.classList.add("fa-dice-two");
  } else if (roll === 3) {
    dice.classList.add("fa-dice-three");
  } else if (roll === 4) {
    dice.classList.add("fa-dice-four");
  } else if (roll === 5) {
    dice.classList.add("fa-dice-five");
  } else if (roll === 6) {
    dice.classList.add("fa-dice-six");
  }
  // ------------------------- Points -------------------------
  if (roll > 1) {
    pointsScore[i].textContent = ptsScore + roll;
    ptsScore = Number(pointsScore[i].textContent);
  } else {
    i === 0 ? player2active() : player1active();
    ptsScore = 0;
    pointsScore[i].textContent = ptsScore;
    i = i === 0 ? 1 : 0;
  }
  // ------------------------- Icon Effects -------------------------
  dice.classList.add("fa-shake");
  document.querySelector(".roll-dice").classList.add("fa-shake");
  setTimeout(function () {
    dice.classList.remove("fa-shake");
    document.querySelector(".roll-dice").classList.remove("fa-shake");
  }, 300);
});
// -----------------------------------------------------------------------

// ----------------------------- Hold Button -----------------------------
holdButton.addEventListener("click", function () {
  if (score[0].textContent >= 50 || score[1].textContent >= 50) {
    return;
  }
  // ------------------------- Player1 Holds -------------------------
  if (i === 0) {
    score[i].textContent = holdScore1 + ptsScore;
    holdScore1 = Number(score[i].textContent);
    ptsScore = 0;
    pointsScore[i].textContent = ptsScore;
    if (score[i].textContent < 50) {
      player2active();
      i = 1;
    }
    // ------------------------- Player2 Holds -------------------------
  } else {
    score[i].textContent = holdScore2 + ptsScore;
    holdScore2 = Number(score[i].textContent);
    ptsScore = 0;
    pointsScore[i].textContent = ptsScore;
    if (score[i].textContent < 50) {
      player1active();
      i = 0;
    }
  }
  // -------------------------- Player Wins --------------------------
  const playerWins = function (player, name1, name2) {
    player.style.backgroundColor = "#2f2f2f";
    name1.style.color = "#c7365f";
    name1.style.fontWeight = "bold";
    name2.style.fontWeight = "400";
  };
  if (score[0].textContent >= 50) {
    playerWins(player1Section, name1, name2);
  } else if (score[1].textContent >= 50) {
    playerWins(player2Section, name2, name1);
  }
  document.querySelector(".dice-empty").style.display = "block";
  dice.className = "fa-solid dice-number";
  dice.style.display = "none";
  // ------------------------- Icon Effects -------------------------
  document.querySelector(".shield").classList.add("fa-fade");
  setTimeout(function () {
    document.querySelector(".shield").classList.remove("fa-fade");
  }, 500);
});
// -----------------------------------------------------------------------

// ----------------------------- New Game -----------------------------
newButton.addEventListener("click", function () {
  ptsScore = 0;
  holdScore1 = 0;
  holdScore2 = 0;
  i = 0;
  for (let i = 0; i < score.length; i++) {
    score[i].textContent = 0;
  }
  for (let i = 0; i < pointsScore.length; i++) {
    pointsScore[i].textContent = 0;
  }
  name1.style.color = "#333";
  name2.style.color = "#333";
  player1Section.style.backgroundColor = "#daaebc";
  player2Section.style.backgroundColor = "#ba7a98";
  name1.style.fontWeight = "bold";
  name2.style.fontWeight = "400";
  document.querySelector(".dice-empty").style.display = "block";
  dice.className = "fa-solid dice-number";
  dice.style.display = "none";
  document.querySelector(".arrow").classList.add("fa-spin");
  setTimeout(function () {
    document.querySelector(".arrow").classList.remove("fa-spin");
  }, 250);
});
// --------------------------------------------------------------------

// ----------------------------- Open/Close Overlay -----------------------------
const openOverlay = function () {
  document.querySelector(".overlay").style.zIndex = "1";
  document.querySelector(".overlay").style.opacity = "100%";
};
const closeOverlay = function () {
  document.querySelector(".overlay").style.zIndex = "-1";
  document.querySelector(".overlay").style.opacity = "0";
};
// ------------------------------------------------------------------------------

// ----------------------------- Rename Buttons -----------------------------
let currName = -1;
const renameIcon = document.querySelectorAll(".rename-icon");
for (let x = 0; x < rename.length; x++) {
  rename[x].addEventListener("click", function () {
    openOverlay();
    document.querySelector(".rename-window").style.zIndex = "2";
    document.querySelector(".rename-window").style.opacity = "1";
    document.querySelector(".new-name").focus();
    // ------------------------- Icon Effects -------------------------
    for (let x = 0; x < renameIcon.length; x++) {
      renameIcon[x].classList.add("fa-shake");
      setTimeout(function () {
        renameIcon[x].classList.remove("fa-shake");
      }, 250);
    }
    return (currName = x);
  });
}
// --------------------------------------------------------------------------

// ----------------------------- Close Rename Window-----------------------------
const closeRename = function () {
  document.querySelector(".rename-window").style.zIndex = "-1";
  document.querySelector(".rename-window").style.opacity = "0";
};
// ------------------------------------------------------------------------------

// ----------------------------- Ok Button / Save Name -----------------------------
// ---------------------------------------------------------------------------------
let newName = document.querySelector(".new-name");
const saveName = function () {
  closeOverlay();
  closeRename();
  if (newName.value === "") {
    return;
  } else {
    if (currName === 0) {
      name1.textContent = newName.value;
    } else if (currName === 1) {
      name2.textContent = newName.value;
    }
  }
  newName.value = "";
};
document.querySelector(".ok-btn").addEventListener("click", saveName);
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Enter" &&
    document.querySelector(".rename-window").style.opacity === "1"
  ) {
    saveName();
  }
});
// ---------------------------------------------------------------------

const infoMenu = document.querySelector(".info-menu");
// ----------------------------- Info Button & Open Menu -----------------------------
info.addEventListener("click", function () {
  openOverlay();
  infoMenu.style.zIndex = "2";
  infoMenu.style.width = "75%";
  infoMenu.style.height = "75%";
  setTimeout(function () {
    document.querySelector(".info-title").style.display = "block";
    document.querySelector(".info-list").style.display = "flex";
  }, 450);
  // ------------------------- Icon Effects -------------------------
  document.querySelector(".info-icon").classList.add("fa-beat-fade");
  setTimeout(function () {
    document.querySelector(".info-icon").classList.remove("fa-beat-fade");
  }, 250);
});
// -----------------------------------------------------------------------------------

// ----------------------------- Close Info Menu -----------------------------
const closeInfo = function () {
  infoMenu.style.zIndex = "-1";
  infoMenu.style.width = "0";
  infoMenu.style.height = "0";
  document.querySelector(".info-title").style.display = "none";
  document.querySelector(".info-list").style.display = "none";
};
// ---------------------------------------------------------------------------

// ----------------------------- Close Info Button -----------------------------
document.querySelector(".close").addEventListener("click", function () {
  closeOverlay();
  closeInfo();
});
// -----------------------------------------------------------------------------

// ----------------------------- Global Closing Events -----------------------------
document.addEventListener("keydown", function (e) {
  if (
    e.key == "Escape" &&
    document.querySelector(".overlay").style.zIndex === "1"
  ) {
    closeOverlay();
    closeInfo();
    closeRename();
    newName.value = "";
  }
});
document.querySelector(".overlay").addEventListener("click", function () {
  if (document.querySelector(".overlay").style.zIndex === "1") {
    closeOverlay();
    closeInfo();
    closeRename();
    newName.value = "";
  } else {
    return;
  }
});
// ------------------------------------------------------------------------------
