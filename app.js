const refreshButton = document.querySelector('#refresh');
const fromCurrency = document.querySelector('#from');
const toCurrency = document.querySelector('#to');
const price = document.querySelector('#price');
const change = document.querySelector('#change');
const timeParagraph = document.querySelector('#time');
const marketsTableBody = document.querySelector('#markets');

async function getRates() {
    try {
        const btcData = await fetch('https://api.cryptonator.com/api/full/btc-usd');
        btcData.json().then((data) => {
            const ticker = data.ticker;
            const time = data.timestamp;
            updateUI(ticker, time);
        });
    } catch (error) {
        console.log('Error');
        console.log(error);
    }
}

refreshButton.addEventListener('click', getRates);

function updateUI(ticker, time) {
    fromCurrency.innerText = ticker.base;
    toCurrency.innerText = ticker.target;
    price.innerText = '$' + parseFloat(ticker.price).toFixed(2);
    change.innerText = '$' + parseFloat(ticker.change).toFixed(2);

    for (item of ticker.markets) {
        const tableRow = document.createElement('tr');
        const marketNameTableCell = document.createElement('td');
        const marketPriceTableCell = document.createElement('td');
        marketNameTableCell.innerText = item.market;
        marketPriceTableCell.innerText = '$' + parseFloat(item.price).toFixed(2);
        tableRow.appendChild(marketNameTableCell);
        tableRow.appendChild(marketPriceTableCell);
        marketsTableBody.appendChild(tableRow);
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date(time * 1000);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    let hours = date.getHours();
    hours < 10 ? hours = '0' + hours : hours;
    let minutes = date.getMinutes();
    minutes < 10 ? minutes = '0' + minutes : minutes;

    const dateFormattedString = `Updated at: ${hours}:${minutes} ${day} ${month} ${year}`
    timeParagraph.innerHTML = dateFormattedString;
}