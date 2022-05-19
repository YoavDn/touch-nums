"use strict";

const elTable = document.querySelector("table");
var elNextNum = document.querySelector(".next-number");
var elGameTime = document.querySelector(".game-time");
var elTime = document.querySelector(".time");
var elCheckBox1 = document.getElementById("check-box1");
var elCheckBox2 = document.getElementById("check-box2");
var elCheckBox3 = document.getElementById("check-box3");

var diff;
var nums = [];
var isTimeRunning = true;

function newGame(elBtn) {
  if (!elCheckBox1.checked && !elCheckBox2.checked && !elCheckBox3.checked) {
    alert("You need to choose difficulty !!!!!!");
    return;
  }
  if (elCheckBox1.checked) diff = 16;
  if (elCheckBox2.checked) diff = 25;
  if (elCheckBox3.checked) diff = 36;

  elTable.innerHTML = "";
  elBtn.innerText = "New Game";
  nums = [];
  resetNum(diff);
  renderTable(nums);

  setGameTime(45);
  elNextNum.innerText = "1";
  //   elNextNum.classList.remove("win");
}

function renderTable(arr) {
  var tableLength = arr.length ** 0.5;
  var strHtml = "";

  for (var i = 0; i < tableLength; i++) {
    strHtml += `<tr>`;

    for (var j = 0; j < tableLength; j++) {
      strHtml += `<td class='' onclick='numClick(this)'>${arr.pop()}</td>`;
    }
    strHtml += `</tr>`;
  }

  elTable.innerHTML += strHtml;
}

function numClick(elCell) {
  //   console.log(elNextNum);
  if (elCell.innerText !== elNextNum.innerText) return;
  +elNextNum.innerText++;

  if (+elNextNum.innerText > diff) {
    elCell.classList.add("num-click");
    won();
  }
  elCell.classList.add("num-click");
}

function won() {
  elNextNum.innerText = "Won";
  elNextNum.classList.add("win");
  isTimeRunning = false;
  setGameTime();
}
function lost() {
  elGameTime.innerText = "You Lost";
  elGameTime.classList.add("lost");
}

function setGameTime(sec = 0) {
  var time = () => (elGameTime.innerHTML = (sec -= 0.01).toFixed(3));
  var stopTime = () => clearInterval(startClock);
  var startClock = setInterval(time, 10);

  setTimeout(stopTime, sec * 1000);
  setTimeout(lost, sec * 1000);
  if (!isTimeRunning) {
    time = elGameTime.innerText;
  }
}

function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
}

function resetNum(diff) {
  for (var i = 1; i <= diff; i++) {
    nums.push(i);
  }
  shuffle(nums);
}

// function getTime() {
//   return elGameTime.innerText;
// }

// function resetTime() {
//   elTime.innerHTML = `Game Time: <br />
//         <span class="game-time">--</span>
//       `;
// }
