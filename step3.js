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


async function webCat(url, term) {
    try {

        let res = await axios.get(url);
        if (term === '--out') {
            fs.writeFile(process.argv[3], res.data, 'utf8', function (err) {
                if (err) {
                    console.log('ERROR WRITING URL DATA TO FILE -', err);
                }
            })
        } else {

            console.log(res.data);
        }
    } catch (e) {
        console.log('ERROR', e);
        process.exit(1);
    }
}

function write(path1, path2, term) {
    if (path1.startsWith('http')) {
        webCat(path1, term);
    } else {
        fs.readFile(path1, 'utf8', (err, data) => {
            if (err) {
                console.log('ERROR READING FILE -', err);
                process.exit(1);
            }
            fs.writeFile(path2, data, 'utf8', function (err) {
                if (err) {
                    console.log('ERROR WRITING FILE -', err)
                }
            })
        })
    }

}



if (process.argv[2] === '--out') {

    write(process.argv[4], process.argv[3], '--out')

} else if (process.argv[2].startsWith('http')) {

    webCat(process.argv[2]);


} else {
    cat(process.argv[2]);
}

