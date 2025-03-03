let cheese = document.querySelector('.cheese-amount');
let parsedCheese = parseFloat(cheese.innerHTML);

let mouseCost = document.querySelector('.mouse-cost');
let parsedMouseCost = parseFloat(mouseCost.innerHTML);
let mouseLevel = document.querySelector('.mouse-level');
let mouseIncrease = document.querySelector('.mouse-increase');
let parsedMouseIncrease = parseFloat(mouseIncrease.innerHTML);

let minerCost = document.querySelector('.miner-cost');
let parsedMinerCost = parseFloat(minerCost.innerHTML);
let minerLevel = document.querySelector('.miner-level');
let minerIncrease = document.querySelector('.miner-increase');
let parsedMinerIncrease = parseFloat(minerIncrease.innerHTML);

let mashineCost = document.querySelector('.mashine-cost');
let parsedMashineCost = parseFloat(mashineCost.innerHTML);
let mashineLevel = document.querySelector('.mashine-level');
let mashineIncrease = document.querySelector('.mashine-increase');
let parsedMashineIncrease = parseFloat(mashineIncrease.innerHTML);

let mechamouseCost = document.querySelector('.mechamouse-cost');
let parsedMechamouseCost = parseFloat(mechamouseCost.innerHTML);
let mechamouseLevel = document.querySelector('.mechamouse-level');
let mechamouseIncrease = document.querySelector('.mechamouse-increase');
let parsedMechamouseIncrease = parseFloat(mechamouseIncrease.innerHTML);

let drillCost = document.querySelector('.drill-cost');
let parsedDrillCost = parseFloat(drillCost.innerHTML);
let drillLevel = document.querySelector('.drill-level');
let drillIncrease = document.querySelector('.drill-increase');
let parsedDrillIncrease = parseFloat(drillIncrease.innerHTML);

let cpcText = document.getElementById("cpc-text");
let cpsText = document.getElementById("cps-text");

let cheeseImgContainer = document.querySelector('.cheese-img-container');

let cpc = 1;

let cps = 0;

function incrementCheese(event) {
    cheese.innerHTML = Math.round(parsedCheese += cpc);

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(cpc)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    cheeseImgContainer.appendChild(div)

    div.classList.add('fade-up')

    timeout(div)
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove()
    }, 800)
}

function buyMouse() {
    if (parsedCheese >= parsedMouseCost) {
        cheese.innerHTML = Math.round(parsedCheese -= parsedMouseCost);

        mouseLevel.innerHTML ++;

        parsedMouseIncrease = parseFloat((parsedMouseIncrease * 1.03).toFixed(2));
        mouseIncrease.innerHTML = parsedMouseIncrease;
        cpc += parsedMouseIncrease;

        parsedMouseCost*= 1.18;
        mouseCost.innerHTML = Math.round(parsedMouseCost);
    }
}

function buyMiner() {
    if (parsedCheese >= parsedMinerCost) {
        cheese.innerHTML = Math.round(parsedCheese -= parsedMinerCost);

        minerLevel.innerHTML ++;

        parsedMinerIncrease = parseFloat((parsedMinerIncrease * 1.03).toFixed(2));
        minerIncrease.innerHTML = parsedMinerIncrease;
        cps += parsedMinerIncrease;

        parsedMinerCost*= 1.18;
        minerCost.innerHTML = Math.round(parsedMinerCost);
    }
}

function buyMechamouse() {
    if (parsedCheese >= parsedMechamouseCost) {
        cheese.innerHTML = Math.round(parsedCheese -= parsedMechamouseCost);

        mechamouseLevel.innerHTML ++;

        parsedMechamouseIncrease = parseFloat((parsedMechamouseIncrease * 1.03).toFixed(2));
        mechamouseIncrease.innerHTML = parsedMechamouseIncrease;
        cps += parsedMechamouseIncrease;

        parsedMechamouseCost*= 1.18;
        mechamouseCost.innerHTML = Math.round(parsedMechamouseCost);
    }
}

function buyMashine() {
    if (parsedCheese >= parsedMashineCost) {
        cheese.innerHTML = Math.round(parsedCheese -= parsedMashineCost);

        mashineLevel.innerHTML ++;

        parsedMashineIncrease = parseFloat((parsedMashineIncrease * 1.03).toFixed(2));
        mashineIncrease.innerHTML = parsedMashineIncrease;
        cps += parsedMashineIncrease;

        parsedMashineCost*= 1.18;
        mashineCost.innerHTML = Math.round(parsedMashineCost);
    }
}

function buyDrill() {
    if (parsedCheese >= parsedDrillCost) {
        cheese.innerHTML = Math.round(parsedCheese -= parsedDrillCost);

        drillLevel.innerHTML ++;

        parsedDrillIncrease = parseFloat((parsedDrillIncrease * 1.03).toFixed(2));
        drillIncrease.innerHTML = parsedDrillIncrease;
        cps += parsedDrillIncrease;

        parsedDrillCost*= 1.18;
        drillCost.innerHTML = Math.round(parsedDrillCost);
    }
}


setInterval(() => {
    parsedCheese += cps / 10;
    cheese.innerHTML = Math.round(parsedCheese);
    cpcText.innerHTML = Math.round(cpc);
    cpsText.innerHTML = Math.round(cps);
}, 100)