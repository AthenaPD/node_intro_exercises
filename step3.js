const fs = require('fs');
const axios = require('axios');

function myWriteFile(outputPath, data) {
    fs.writeFile(outputPath, data, 'utf8', err => {
        if (err) {
            console.log(`Error: couldn't write to ${outputPath}:\n ${err.message}`);
            process.kill(1);
        }
    });
}

function cat(filePath, outputPath=null) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${filePath}\n Error: ${err.message}`);
            process.kill(1);
        }
        if (outputPath) myWriteFile(outputPath, data); 
        else console.log(data);
    })
}

function webCat(url, outputPath=null) {
    axios.get(`${url}`)
        .then(resp => {
            if (outputPath) myWriteFile(outputPath, resp.data);
            else console.log(resp.data.slice(0, 80), '...');
        })
        .catch(err => console.log(`Error fetching ${url}:\n Error: ${err.message}`));
}

function catStep3(input, output=null) {
    if (input.includes('http')) webCat(input, output);
    else cat(input, output);
}

if (process.argv[2] !== '--out') {
    const address = process.argv[2];
    catStep3(address);
} else {
    const outputPath = process.argv[3].slice(0,-4);
    const inputFiles = process.argv.slice(4);
    inputFiles.forEach((file, idx) => {
        // const input = process.argv[4];
        const output = `${outputPath}_${idx}.txt`;
        catStep3(file, output);
    })
}
