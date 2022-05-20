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
var gsetInterval;
var gGameTimeOut;
var timer;
var timeout1;
var timeout2;
var timeout3;
function countDown() {
  timer = (timer -= 0.01).toFixed(3);

  elGameTime.innerHTML = timer;
}

function stopTime() {
  clearInterval(gsetInterval);
}
function resetTimeOut() {
  clearTimeout(gGameTimeOut);
}

function newGame(elBtn) {
  if (!elCheckBox1.checked && !elCheckBox2.checked && !elCheckBox3.checked) {
    alert("You need to choose difficulty !!!!!!");
    return;
  }
  clearTimeout(timeout1);
  clearTimeout(timeout2);
  clearTimeout(timeout3);
  stopTime();
  resetDom();
  elBtn.innerText = "New Game";
  timer = 30;

  if (elCheckBox1.checked) diff = 16;
  if (elCheckBox2.checked) diff = 25;
  if (elCheckBox3.checked) diff = 36;

  gsetInterval = setInterval(countDown, 10);
  gGameTimeOut = setGameTimeout(timer);

  nums = [];
  resetNum(diff);
  renderTable(nums);

  elNextNum.innerText = "1";
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
    stopTime();
  }
  elCell.classList.add("num-click");
}

function won() {
  elNextNum.innerText = "Won";
  elNextNum.classList.add("win");
  isTimeRunning = false;
  stopTime();
}
function lost() {
  //   elGameTime.classList.add("lost");
  elTable.classList.add("stop-table-events");
  elGameTime.innerText = "You Lost";
}

function setGameTimeout(sec = 0) {
  timeout1 = setTimeout(stopTime, sec * 1000);
  timeout2 = setTimeout(lost1, (sec - 5) * 1000);
  timeout3 = setTimeout(lost, sec * 1000);
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

function resetDom() {
  elTable.innerHTML = "";
  elGameTime.innerHTML = 30;
  elGameTime.classList.remove("lost");
  elTable.classList.remove("stop-table-events");
}

function lost1() {
  elGameTime.classList.add("lost");
}

clearTimeout(a);
