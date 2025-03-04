let cheese = document.querySelector('.cheese-amount');
let parsedCheese = parseFloat(cheese.innerHTML);

let cpcText = document.getElementById("cpc-text");
let cpsText = document.getElementById("cps-text");

let cheeseImgContainer = document.querySelector('.cheese-img-container');

let cpc = 1;

let cps = 0;

const upgrades = [
    {
        name: 'mouse',
        cost: document.querySelector('.mouse-cost'),
        parsedCost: parseFloat(document.querySelector('.mouse-cost').innerHTML),
        increase: document.querySelector('.mouse-increase'),
        parsedIncrease: parseFloat(document.querySelector('.mouse-increase').innerHTML),
        level: document.querySelector('.mouse-level'),
        cheeseMultiplier: 1.025,
        costMultiplier: 1.12,
    },

    {
        name: 'miner',
        cost: document.querySelector('.miner-cost'),
        parsedCost: parseFloat(document.querySelector('.miner-cost').innerHTML),
        increase: document.querySelector('.miner-increase'),
        parsedIncrease: parseFloat(document.querySelector('.miner-increase').innerHTML),
        level: document.querySelector('.miner-level'),
        cheeseMultiplier: 1.03,
        costMultiplier: 1.115,
    },

    {
        name: 'mechamouse',
        cost: document.querySelector('.mechamouse-cost'),
        parsedCost: parseFloat(document.querySelector('.mechamouse-cost').innerHTML),
        increase: document.querySelector('.mechamouse-increase'),
        parsedIncrease: parseFloat(document.querySelector('.mechamouse-increase').innerHTML),
        level: document.querySelector('.mechamouse-level'),
        cheeseMultiplier: 1.035,
        costMultiplier: 1.11,
    },

    {
        name: 'mashine',
        cost: document.querySelector('.mashine-cost'),
        parsedCost: parseFloat(document.querySelector('.mashine-cost').innerHTML),
        increase: document.querySelector('.mashine-increase'),
        parsedIncrease: parseFloat(document.querySelector('.mashine-increase').innerHTML),
        level: document.querySelector('.mashine-level'),
        cheeseMultiplier: 1.04,
        costMultiplier: 1.105,
    },

    {
        name: 'drill',
        cost: document.querySelector('.drill-cost'),
        parsedCost: parseFloat(document.querySelector('.drill-cost').innerHTML),
        increase: document.querySelector('.drill-increase'),
        parsedIncrease: parseFloat(document.querySelector('.drill-increase').innerHTML),
        level: document.querySelector('.drill-level'),
        cheeseMultiplier: 1.045,
        costMultiplier: 1.1,
    }
];

function incrementCheese(event) {
    cheese.innerHTML = Math.round(parsedCheese += cpc);

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(cpc)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    cheeseImgContainer.appendChild(div)

    div.classList.add('fade-up')

    timeout(div);
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove();
    }, 800);
}

function buyUpgrade(upgrade) {           // mu = mathedUpgrade
    const mu = upgrades.find((u) => {               // u = upgrade
        if (u.name === upgrade) return u
    })

    if (parsedCheese >= mu.parsedCost) {
        cheese.innerHTML = Math.round(parsedCheese -= mu.parsedCost);

        mu.level.innerHTML ++;

        mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.cheeseMultiplier).toFixed(2));
        mu.increase.innerHTML = mu.parsedIncrease;

        mu.parsedCost *= mu.costMultiplier;
        mu.cost.innerHTML = Math.round(mu.parsedCost);

        if (mu.name === 'mouse') {
            cpc += mu.parsedIncrease;
        } else {
            cps += mu.parsedIncrease;
        }
    }
}

function save () {
    localStorage.clear();

    upgrades.map((upgrade) => {

        const obj = JSON.stringify({
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease,
        })

        localStorage.setItem(upgrade.name, obj);

    })

    localStorage.setItem('cpc', JSON.stringify(cpc));
    localStorage.setItem('cps', JSON.stringify(cps));
    localStorage.setItem('cheese', JSON.stringify(parsedCheese));
}

function load () {
    upgrades.map((upgrade) => {
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name));

        upgrade.parsedCost = savedValues.parsedCost;
        upgrade.parsedIncrease = savedValues.parsedIncrease;

        upgrade.level.innerHTML = savedValues.parsedLevel;
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost);
        upgrade.increase.innerHTML = upgrade.parsedIncrease;
    })

    cpc = JSON.parse(localStorage.getItem('cpc'));
    cps = JSON.parse(localStorage.getItem('cps'));
    parsedCheese = JSON.parse(localStorage.getItem('cheese'));

    cheese.innerHTML = Math.round(parsedCheese);
    }
    
setInterval(() => {
    parsedCheese += cps / 10;
    cheese.innerHTML = Math.round(parsedCheese);
    cpcText.innerHTML = Math.round(cpc);
    cpsText.innerHTML = Math.round(cps);
}, 100)