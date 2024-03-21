const JSON_URI = 'https://stats.games.amusnet.io/jackpot_AmbassadoribetGE_GEL.json';
let previousJackpots = [];

syncJackpots();

function syncJackpots() {
    fetch(JSON_URI, { cache: 'no-cache' })
    .then(res => res.json())
    .then(data => {
        // If previousJackpots is empty, initialize it with the values from the current JSON data
        if (previousJackpots.length === 0) {
            previousJackpots = [
                parseInt(data.currentLevelIV.toString().replace('.', '')),
                parseInt(data.currentLevelIII.toString().replace('.', '')),
                parseInt(data.currentLevelII.toString().replace('.', '')),
                parseInt(data.currentLevelI.toString().replace('.', ''))
            ];
        }

        const currentJackpots = [
            parseInt(data.currentLevelIV.toString().replace('.', '')),
            parseInt(data.currentLevelIII.toString().replace('.', '')),
            parseInt(data.currentLevelII.toString().replace('.', '')),
            parseInt(data.currentLevelI.toString().replace('.', ''))
        ];

        // Calculate the difference between the current and previous values
        const diffs = currentJackpots.map((jackpot, index) => jackpot - previousJackpots[index]);

        const wrap = [];
        const domArr = [];

        currentJackpots.forEach((jackpot, index) => {
            // If the difference is negative, it means the value has decreased, so we use the current jackpot as previous
            if (diffs[index] < 0) {
                previousJackpots[index] = jackpot;
            }

            // Create DOM elements and update them based on the difference
            createInitialDomElements(wrap, domArr, previousJackpots[index], index, diffs[index]);
        });

        // Update previousJackpots to currentJackpots for the next iteration
        previousJackpots = currentJackpots.slice();
    });
}

function createInitialDomElements(wrap, domArr, jackpot, index, diff) {
    wrap[index] = document.getElementById('wrapp' + index);
    wrap[index].innerHTML = '';
    domArr[index] = [];

    jackpot.toString().split('').forEach((number, numIndex) => {
        const numDom = document.createElement('div');
        numDom.innerHTML = parseInt(number);
        wrap[index].appendChild(numDom);
        domArr[index].push(numDom);
    
        // Separator
        if (((jackpot.toString().length - 3) - numIndex) % 3 == 0) {
            const numDomSeparator = document.createElement('div');
            const separator = jackpot.toString().length - 3 == numIndex ? '.' : ',';
            for(var i = 0; i < 3; i ++) {
                const a = document.createElement('div');
                a.innerHTML = separator;
                numDomSeparator.appendChild(a);
            }
            wrap[index].appendChild(numDomSeparator);
        }
    });

    // If the difference is positive, update the displayed numbers based on the difference
    if (diff > 0) {
        const interval = setInterval(() => {
            iterateAndUpdateJackpot(jackpot, index, wrap, domArr);
        }, 60000 / diff); // Adjust the interval based on the difference
        // Store the interval for later clearing
        intervals.push(interval);
    }
}

function iterateAndUpdateJackpot(jackpot, index, wrap, domArr) {
    // Increase the jackpot value
    jackpot++;
    
    // Update the DOM elements accordingly
    domArr[index].forEach((numDom, numIndex) => {
        numDom.innerHTML = parseInt(jackpot.toString()[numIndex]);
    });
}