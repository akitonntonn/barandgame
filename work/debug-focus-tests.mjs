import fs from "node:fs";
import vm from "node:vm";

function createElementStub(id) {
  const classes = new Set();
  return {
    id,
    textContent: "",
    value: "",
    disabled: false,
    hidden: false,
    naturalWidth: 0,
    complete: false,
    style: {},
    classList: {
      add: (...names) => names.forEach((name) => classes.add(name)),
      remove: (...names) => names.forEach((name) => classes.delete(name)),
      toggle: (name, force) => {
        if (force) classes.add(name);
        else classes.delete(name);
      },
      contains: (name) => classes.has(name)
    },
    addEventListener: () => {},
    appendChild: () => {},
    offsetHeight: 1
  };
}

const elements = new Map();
const documentStub = {
  addEventListener: () => {},
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, createElementStub(id));
    return elements.get(id);
  },
  querySelectorAll() {
    return [];
  },
  createElement(tag) {
    return {
      tag,
      textContent: "",
      className: "",
      appendChild: () => {}
    };
  }
};

const storage = new Map();
const sandbox = {
  document: documentStub,
  window: { setTimeout: () => 0 },
  performance: { now: () => 0 },
  requestAnimationFrame: () => 1,
  cancelAnimationFrame: () => {},
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value))
  },
  console
};

const appCode = fs.readFileSync("script.js", "utf8");
const tests = `
const testResults = [];
function check(name, condition) {
  testResults.push({ name, pass: Boolean(condition) });
}

startGame();
check("restart drunkMeter reset", state.drunkMeter === 0);
check("restart focusMeter reset", state.focusMeter === 0);
check("restart focusMode reset", state.focusMode === false);

state.focusMode = true;
state.focusModeTimeLeft = 5;
state.paused = true;
state.lastFrame = 0;
gameLoop(1000);
check("pause keeps focus timer", state.focusModeTimeLeft === 5);
state.paused = false;

state.drunkMeter = 100;
check("drunk 100 ends game", shouldEndGame() === true);
state.drunkMeter = 0;
state.hp = 0;
check("hp 0 ends game", shouldEndGame() === true);
state.hp = MAX_HP;
state.timeLeft = 0;
check("time 0 ends game", shouldEndGame() === true);
state.timeLeft = 30;

state.focusMeter = 0;
state.focusMode = false;
increaseFocusMeter(100);
check("focus 100 activates", state.focusMode === true);
check("focus activation resets meter", state.focusMeter === 0);
increaseFocusMeter(50);
check("focus mode blocks focus gain", state.focusMeter === 0);
state.focusModeTimeLeft = 5;
updateFocusMode(5.1);
check("focus mode ends", state.focusMode === false);

state.level = 1;
const normalJudgeTime = getCurrentJudgeTime();
state.focusMode = true;
const focusedJudgeTime = getCurrentJudgeTime();
state.focusMode = false;
check("focus extends judge time by 0.6s", Math.abs((focusedJudgeTime - normalJudgeTime) - 0.6) < 0.001);
check("judge time returns after focus", getCurrentJudgeTime() === normalJudgeTime);

state.drunkMeter = 2;
decreaseDrunkMeter(20);
check("drunk meter does not go below 0", state.drunkMeter === 0);
increaseDrunkMeter(200);
check("drunk meter display clamped at 100", state.drunkMeter === 100);
state.focusMeter = 2;
decreaseFocusMeter(20);
check("focus meter does not go below 0", state.focusMeter === 0);
state.focusMode = false;
increaseFocusMeter(200);
check("focus meter does not display over 100", state.focusMeter === 0 && state.focusMode === true);

state.hp = 100;
state.drunkMeter = 0;
state.focusMode = true;
state.currentDrink = { name: "Highball", type: "alcohol", correctAction: ACTIONS.avoid };
state.acceptingInput = true;
state.timeLeft = 30;
judge(ACTIONS.drink);
check("focus mode miss still reduces hp", state.hp === 82);
check("wrong alcohol drink raises drunk", state.drunkMeter === 25);
check("wrong alcohol drink subtracts 7 seconds", Math.round(state.timeLeft) === 23);

state.drunkMeter = 0;
state.focusMeter = 50;
state.currentDrink = { name: "炭酸水", type: "nonAlcohol", correctAction: ACTIONS.drink };
state.acceptingInput = true;
state.focusMode = false;
state.timeLeft = 30;
judge(ACTIONS.avoid);
check("avoiding non-alcohol does not raise drunk", state.drunkMeter === 0);
check("miss lowers focus", state.focusMeter === 40);

state.drunkMeter = 30;
state.focusMeter = 0;
state.currentDrink = { name: "水", type: "nonAlcohol", correctAction: ACTIONS.drink };
state.acceptingInput = true;
state.judgeTime = 3;
state.judgeLeft = 1;
state.timeLeft = 30;
judge(ACTIONS.drink);
check("water correct lowers drunk by 8", state.drunkMeter === 22);
check("water correct raises focus by 15", state.focusMeter === 15);

state.focusMode = false;
state.timeLeft = 30;
applyTimeReward(true, false, { type: "nonAlcohol" }, ACTIONS.drink, "answer");
check("normal correct adds 3 seconds", state.timeLeft === 33);
state.timeLeft = 30;
applyTimeReward(true, true, { type: "nonAlcohol" }, ACTIONS.drink, "answer");
check("perfect correct adds 5 seconds", state.timeLeft === 35);
state.focusMode = true;
state.timeLeft = 30;
applyTimeReward(true, false, { type: "nonAlcohol" }, ACTIONS.drink, "answer");
check("focus correct adds 2 seconds", state.timeLeft === 32);
state.timeLeft = 30;
applyTimeReward(true, true, { type: "nonAlcohol" }, ACTIONS.drink, "answer");
check("focus perfect adds 3 seconds", state.timeLeft === 33);
state.focusMode = false;
state.timeLeft = 30;
applyTimeReward(false, false, { type: "nonAlcohol" }, ACTIONS.avoid, "answer");
check("normal miss subtracts 5 seconds", state.timeLeft === 25);
state.timeLeft = 30;
applyTimeReward(false, false, { type: "alcohol" }, ACTIONS.drink, "answer");
check("wrong alcohol drink subtracts 7 seconds", state.timeLeft === 23);
state.timeLeft = 30;
applyTimeReward(false, false, { type: "nonAlcohol" }, null, "timeout");
check("timeout miss does not subtract extra time", state.timeLeft === 30);
state.timeLeft = 58;
addTime(10);
check("time does not exceed max", state.timeLeft === 60);
state.timeLeft = 2;
subtractTime(10);
check("time does not go below 0", state.timeLeft === 0);

state.focusMode = false;
state.hp = 80;
state.drunkMeter = 40;
state.focusMeter = 0;
state.score = 0;
applySpecialDrinkEffect({ name: "Chaser", type: "nonAlcohol", specialType: "chaser" }, ACTIONS.drink, true);
check("chaser restores one heart", state.hp === 100);
check("chaser lowers drunk by 15", state.drunkMeter === 25);
check("chaser raises focus by 10", state.focusMeter === 10);

state.focusMode = false;
state.score = 0;
state.drunkMeter = 20;
state.focusMeter = 0;
applySpecialDrinkEffect({ name: "Golden Water", type: "nonAlcohol", specialType: "goldenWater" }, ACTIONS.drink, true);
check("golden water adds bonus score", state.score === 500);
check("golden water raises focus by 25", state.focusMeter === 25);
check("golden water lowers drunk by 10", state.drunkMeter === 10);

state.timeLeft = 30;
state.drunkMeter = 0;
state.hp = 100;
applySpecialDrinkEffect({ name: "Trap Shot", type: "alcohol", specialType: "trapShot" }, ACTIONS.drink, false);
check("trap shot extra drunk is light", state.drunkMeter === 10);
check("trap shot extra time penalty is light", state.timeLeft === 28);
check("trap shot special effect does not double hp damage", state.hp === 100);

state.currentDrink = { name: "Mystery Glass", type: "mystery", specialType: "mystery", action: null };
state.currentResolvedDrink = null;
check("mystery cannot be judged before reveal", getDrinkForJudgment() === null);
state.currentResolvedDrink = { name: "Water", type: "nonAlcohol", correctAction: ACTIONS.drink };
check("mystery uses resolved drink after reveal", getDrinkForJudgment().name === "Water");

testResults;
`;

const results = vm.runInNewContext(`${appCode}\n${tests}`, sandbox);
const failed = results.filter((result) => !result.pass);
for (const result of results) {
  console.log(`${result.pass ? "PASS" : "FAIL"} ${result.name}`);
}
if (failed.length) process.exit(1);
