const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR', err);
            process.exit(1)
        }
        console.log(data);
    })
}


async function webCat(url) {
    try {

        let res = await axios.get(url);
        console.log(res.data);
    } catch (e) {
        console.log('ERROR', e);
        process.exit(1);
    }
}



if (process.argv[2].startsWith('http')) {
    webCat(process.argv[2]);
} else {
    cat(process.argv[2]);
}

