const fs = require('fs');
const axios = require('axios');

function cat(filePath) {
    fs.readFile(`${filePath}`, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${filePath}\n Error: ${err.message}`);
            process.kill(1);
        }
        console.log(data);
    })
}

function webCat(url) {
    axios.get(`${url}`)
        .then(resp => console.log(resp.data.slice(0, 80), '...'))
        .catch(err => console.log(`Error fetching ${url}:\n Error: ${err.message}`));
}

const address = process.argv[2];
if (address.includes('http')) webCat(address);
else cat(address);