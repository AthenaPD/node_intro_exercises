const fs = require('fs');

function cat(filePath) {
    fs.readFile(`${filePath}`, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${filePath}\n`, err);
            process.kill(1);
        }
        console.log(data);
    })
}

cat(process.argv[2]);