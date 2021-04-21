const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR', err);
            process.exit(1)
        }
        console.log(data);
    })
}

for (let i = 0; i < process.argv.length; i++) {
    if (i === 2) {
        cat(process.argv[i])
    }
}