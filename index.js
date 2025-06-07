document.getElementById('tab-buildings').onclick = function() {
  document.getElementById('buildings-list').style.display = 'block';
  document.getElementById('upgrades-list').style.display = 'none';
  this.classList.add('active');
  document.getElementById('tab-upgrades').classList.remove('active');
};

document.getElementById('tab-upgrades').onclick = function() {
  document.getElementById('buildings-list').style.display = 'none';
  document.getElementById('upgrades-list').style.display = 'block';
  this.classList.add('active');
  document.getElementById('tab-buildings').classList.remove('active');
};
// This code handles the tab switching functionality for the buildings and upgrades sections.

// wobble animation for the cheese moon
const cheesemoon = document.querySelector('.cheesemoon');

cheesemoon.addEventListener('mouseenter', function() {
  cheesemoon.style.animation = 'wobble 0.4s';
});

cheesemoon.addEventListener('mouseleave', function() {
  cheesemoon.style.animation = 'wobble_back 0.4s';
});

cheesemoon.addEventListener('mousedown', function() {
  cheesemoon.style.animation = 'wobble_click 0.4s';
});

cheesemoon.addEventListener('mouseup', function() {
  cheesemoon.style.animation = 'wobble_release 0.4s';
});

cheesemoon.addEventListener('animationend', function(event) {
  if (event.animationName === 'wobble' || event.animationName === 'wobble_release') {
    // Nach hover oder mouseup: Bleibe auf 1.08, wenn noch Hover, sonst auf 1
    if (cheesemoon.matches(':hover')) {
      cheesemoon.style.transform = 'scale(1.08)';
    } else {
      cheesemoon.style.transform = 'scale(1)';
    }
  } else if (
    event.animationName === 'wobble_back' ||
    event.animationName === 'wobble_click'
  ) {
    cheesemoon.style.transform = 'scale(1)';
  }
  cheesemoon.style.animation = '';
});


let cheese = document.querySelector('.cheese-cost');
let parsedCheese = parseFloat(cheese.innerHTML);

let cpcText = document.querySelector('.cpc');
let cpsText = document.querySelector('.cps');

let cheesemoonImgContainer = document.querySelector('.cheesemoon-img-container');

let cpc = 1;
let cps = 0;

const buildings = [
  {
    name: 'Mouse',
    cost: document.querySelector('.mouse-cost'),
    parsedCost: parseFloat(document.querySelector('.mouse-cost').innerHTML),
    increase: document.querySelector('.mouse-increase'),
    parsedIncrease: parseFloat(document.querySelector('.mouse-increase').innerHTML),
    level: document.querySelector('.mouse-level'),
    cheesemultiplier: 1.025,
    costMultiplier: 1.180,
  },

  {
    name: 'Miner',
    cost: document.querySelector('.miner-cost'),
    parsedCost: parseFloat(document.querySelector('.miner-cost').innerHTML),
    increase: document.querySelector('.miner-increase'),
    parsedIncrease: parseFloat(document.querySelector('.miner-increase').innerHTML),
    level: document.querySelector('.miner-level'),
    cheesemultiplier: 1.030,
    costMultiplier: 1.175,
  },

  {
    name: 'Minecart',
    cost: document.querySelector('.minecart-cost'),
    parsedCost: parseFloat(document.querySelector('.minecart-cost').innerHTML),
    increase: document.querySelector('.minecart-increase'),
    parsedIncrease: parseFloat(document.querySelector('.minecart-increase').innerHTML),
    level: document.querySelector('.minecart-level'),
    cheesemultiplier: 1.035,
    costMultiplier: 1.170,
  },

  {
    name: 'Excavator',
    cost: document.querySelector('.excavator-cost'),
    parsedCost: parseFloat(document.querySelector('.excavator-cost').innerHTML),
    increase: document.querySelector('.excavator-increase'),
    parsedIncrease: parseFloat(document.querySelector('.excavator-increase').innerHTML),
    level: document.querySelector('.excavator-level'),
    cheesemultiplier: 1.040,
    costMultiplier: 1.165,
  },

  {
    name: 'Drill',
    cost: document.querySelector('.drill-cost'),
    parsedCost: parseFloat(document.querySelector('.drill-cost').innerHTML),
    increase: document.querySelector('.drill-increase'),
    parsedIncrease: parseFloat(document.querySelector('.drill-increase').innerHTML),
    level: document.querySelector('.drill-level'),
    cheesemultiplier: 1.045,
    costMultiplier: 1.160,
  },

  {
    name: 'Harvester',
    cost: document.querySelector('.harvester-cost'),
    parsedCost: parseFloat(document.querySelector('.harvester-cost').innerHTML),
    increase: document.querySelector('.harvester-increase'),
    parsedIncrease: parseFloat(document.querySelector('.harvester-increase').innerHTML),
    level: document.querySelector('.harvester-level'),
    cheesemultiplier: 1.050,
    costMultiplier: 1.155,
  },
]

function incrementCheese(event) {
  cheese.innerHTML = Math.round(parsedCheese += cpc);

  //fade-up animation cheesemoon
  const x = event.offsetX;
  const y = event.offsetY;

  const div = document.createElement('div');
  div.innerHTML = `+${Math.round(cpc)}`;
  div.style.cssText = `color: #52525b; font-family: 'Baloo 2', sans-serif; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`;
  cheesemoonImgContainer.appendChild(div);

  div.classList.add('fade-up');
  timeout(div);
}
const timeout = (div) => {
  setTimeout(() => {
    div.remove();
  }, 4000);
}

function buyBuilding(building) {
  const mb = buildings.find((b) => {    // b= building mb= matchedBuilding
    if (b.name === building) return b
  })

  if (parsedCheese >= mb.parsedCost) {
    cheese.innerHTML = Math.round(parsedCheese -= mb.parsedCost);

    mb.level.innerHTML ++;

    mb.parsedIncrease = parseFloat((mb.parsedIncrease * mb.cheesemultiplier).toFixed(2));
    mb.increase.innerHTML = mb.parsedIncrease;

    mb.parsedCost = Math.round(mb.parsedCost * mb.costMultiplier);
    mb.cost.innerHTML = Math.round(mb.parsedCost);

    if (mb.name === 'Mouse') {
      cpc += mb.parsedIncrease;
    } else {
      cps += mb.parsedIncrease;
    }
  }
}

// setting button 
document.getElementById('settings-btn').onclick = function() {
  document.querySelector('.center-main').style.display = 'none';
  document.querySelector('.settings').style.display = 'block';
};

function showMain() {
  document.querySelector('.settings').style.display = 'none';
  document.querySelector('.center-main').style.display = 'block';
}

function save () {
  localStorage.clear()

  buildings.map((building) => {

    const obj = JSON.stringify({
      parsedLevel: parseFloat(building.level.innerHTML),
      parsedCost: building.parsedCost,
      parsedIncrease: building.parsedIncrease
    })

    localStorage.setItem(building.name, obj)

  })

  localStorage.setItem('cpc', JSON.stringify(cpc))
  localStorage.setItem('cps', JSON.stringify(cps))
  localStorage.setItem('cheese', JSON.stringify(parsedCheese))
}

function load () {
  buildings.map((building) => {
    const savedValues = JSON.parse(localStorage.getItem(building.name))

    building.parsedCost = savedValues.parsedCost
    building.parsedIncrease = savedValues.parsedIncrease

    building.level.innerHTML = savedValues.parsedLevel
    building.cost.innerHTML = Math.round(building.parsedCost)
    building.increase.innerHTML = building.parsedIncrease
  })

  cpc = JSON.parse(localStorage.getItem('cpc'))
  cps = JSON.parse(localStorage.getItem('cps'))
  parsedCheese = JSON.parse(localStorage.getItem('cheese'))

  cheese.innerHTML = Math.round(parsedCheese)
}

setInterval(() => {
  parsedCheese += cps / 10
  cheese.innerHTML = Math.round(parsedCheese);
  cpcText.innerHTML = Math.round(cpc);
  cpsText.innerHTML = Math.round(cps);
},100);


// --- Building Stats Popup Funktion ---
function updateBuildingStatsPopup(card) {
  const popup = document.getElementById('global-building-stats');
  if (popup.style.display !== 'flex') return; // Nur wenn sichtbar
  // Daten aus der Card holen
  const img = card.querySelector('.building-img').outerHTML;
  const name = card.querySelector('.building-name').textContent;
  const increase = card.querySelector('.building-info p:nth-child(2)').innerHTML;
  const level = card.querySelector('.building-info p:nth-child(3)').innerHTML;
  popup.innerHTML = `
    ${img}
    <div><strong>${name}</strong></div>
    <div>${increase}</div>
    <div>${level}</div>
  `;
  // Position neu berechnen
  const rect = card.getBoundingClientRect();
  popup.style.left = '0px';
  popup.style.top = '0px';
  popup.style.display = 'flex';
  popup.style.left = (rect.left - popup.offsetWidth - 12) + 'px';
  popup.style.top = (rect.top + rect.height/2 - popup.offsetHeight/2) + 'px';
}

// --- Popup-Event-Handler ---
document.querySelectorAll('.building-card').forEach(card => {
  card.addEventListener('mouseenter', function(e) {
    const popup = document.getElementById('global-building-stats');
    // Daten aus der Card holen
    const img = card.querySelector('.building-img').outerHTML;
    const name = card.querySelector('.building-name').textContent;
    const increase = card.querySelector('.building-info p:nth-child(2)').innerHTML;
    const level = card.querySelector('.building-info p:nth-child(3)').innerHTML;
    popup.innerHTML = `
      ${img}
      <div><strong>${name}</strong></div>
      <div>${increase}</div>
      <div>${level}</div>
    `;
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    // Position berechnen
    const rect = card.getBoundingClientRect();
    popup.style.minWidth = '200px';
    popup.style.maxWidth = '300px';
    popup.style.background = 'white';
    popup.style.border = '1px solid #ffd700';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
    popup.style.padding = '16px';
    popup.style.position = 'fixed';
    popup.style.zIndex = 9999;
    // Erst sichtbar machen, damit offsetWidth stimmt
    popup.style.left = '0px';
    popup.style.top = '0px';
    popup.style.display = 'flex';
    // Jetzt links positionieren:
    popup.style.left = (rect.left - popup.offsetWidth - 12) + 'px';
    popup.style.top = (rect.top + rect.height/2 - popup.offsetHeight/2) + 'px';
  });
  card.addEventListener('mouseleave', function(e) {
    const popup = document.getElementById('global-building-stats');
    popup.style.display = 'none';
  });
});

// Popup bleibt sichtbar, wenn man mit der Maus drüber fährt
const popup = document.getElementById('global-building-stats');
popup.addEventListener('mouseenter', () => popup.style.display = 'flex');
popup.addEventListener('mouseleave', () => popup.style.display = 'none');

// --- Nach dem Level-Up das Popup ggf. aktualisieren ---
function buyBuilding(building) {
  const mb = buildings.find((b) => b.name === building);
  if (parsedCheese >= mb.parsedCost) {
    cheese.innerHTML = Math.round(parsedCheese -= mb.parsedCost);

    mb.level.innerHTML ++;
    mb.parsedIncrease = parseFloat((mb.parsedIncrease * mb.cheesemultiplier).toFixed(2));
    mb.increase.innerHTML = mb.parsedIncrease;
    mb.parsedCost = Math.round(mb.parsedCost * mb.costMultiplier);
    mb.cost.innerHTML = Math.round(mb.parsedCost);

    if (mb.name === 'Mouse') {
      cpc += mb.parsedIncrease;
    } else {
      cps += mb.parsedIncrease;
    }

    // --- Popup-Update, falls offen ---
    document.querySelectorAll('.building-card').forEach(card => {
      const name = card.querySelector('.building-name').textContent;
      if (name === mb.name) updateBuildingStatsPopup(card);
    });
  }
}