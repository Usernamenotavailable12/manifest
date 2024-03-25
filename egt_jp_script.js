const TIME_INTERVAL = 10;
const JSON_URI = 'https://stats.games.amusnet.io/jackpot_AmbassadoribetGE_GEL.json';
let intervals = [];
let previousJackpots = [];

syncJackpots();

setInterval(() => {
    syncJackpots();
}, TIME_INTERVAL * 1000);

function syncJackpots() {
    fetch(JSON_URI, { cache: 'no-cache' })
    .then(res => res.json())
    .then(data => {
        intervals.forEach(interval => clearInterval(interval));
        intervals = [];

        if (previousJackpots.length === 0) {
            previousJackpots = [
                parseInt(data.currentLevelI.toString().replace('.', '')),
                parseInt(data.currentLevelII.toString().replace('.', '')),
                parseInt(data.currentLevelIII.toString().replace('.', '')),
                parseInt(data.currentLevelIV.toString().replace('.', ''))
            ];
        } else {
            // Update previousJackpots with the latest data
            previousJackpots[0] = parseInt(data.currentLevelI.toString().replace('.', ''));
            previousJackpots[1] = parseInt(data.currentLevelII.toString().replace('.', ''));
            previousJackpots[2] = parseInt(data.currentLevelIII.toString().replace('.', ''));
            previousJackpots[3] = parseInt(data.currentLevelIV.toString().replace('.', ''));
        }

        const currentJackpots = [
            parseInt(data.currentLevelI.toString().replace('.', '')),
            parseInt(data.currentLevelII.toString().replace('.', '')),
            parseInt(data.currentLevelIII.toString().replace('.', '')),
            parseInt(data.currentLevelIV.toString().replace('.', ''))
        ];
        
        const diffs = currentJackpots.map((jackpot, index) => jackpot - previousJackpots[index]);

        const wrap = [];
        const domArr = [];

        previousJackpots.forEach((jackpot, index) => {
            createInitialDomElements(wrap, domArr, jackpot, index);

            const updateInterval = TIME_INTERVAL * 1000 / diffs[index]; // Calculate update interval based on difference
            intervals.push(
                setInterval(() => {
                    iterateAndUpdateJackpot(previousJackpots, index, wrap, domArr);
                }, updateInterval)
            );
        });
    });
}

function createInitialDomElements(wrap, domArr, jackpot, index) {
    wrap[index] = document.getElementById('wrapp' + index);
    wrap[index].innerHTML = '';
    domArr[index] = [];

    jackpot.toString().split('').forEach((number, numIndex) => {
        const numDom = document.createElement('div');
        numDom.innerHTML = parseInt(number)
        wrap[index].appendChild(numDom);
        domArr[index].push(numDom)
    
        if (((jackpot.toString().length - 3) - numIndex) % 3 == 0) {
            const numDomSeparator = document.createElement('div');
            const separator = jackpot.toString().length - 3 == numIndex ? '.' : ',';
            for(var i = 0; i < 3; i ++){
                const a = document.createElement('div');
                a.innerHTML = separator;
                numDomSeparator.appendChild(a);
            }
            wrap[index].appendChild(numDomSeparator);
        }
    });
}
function iterateAndUpdateJackpot(jackpots, index, wrap, domArr) {
    jackpots[index]++
    const jackpot = jackpots[index];

    const jackLength = jackpot.toString().length;
    if (wrap[index].children.length != jackLength + Math.floor(jackLength / 3)) {
        createInitialDomElements(wrap, domArr, jackpot, index);
        return;
    }

    const el = domArr[index][domArr[index].length - 1];

    el.innerHTML = (parseInt(el.innerHTML) + 1) % 10;

    let div = 1;
    for (let i = domArr[index].length - 1; i >= 0; i--) {
        div *= 10;
        if (jackpot % div == 0) {
            domArr[index][i].innerHTML = (parseInt(domArr[index][i].innerHTML) + 1) % 10
        }
    }
}
