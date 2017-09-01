const fs = require('fs');
const readline = require('readline');

const loc = './files/2017-08-31-18-52-news-v2-26427483-0.json';

const read = readline.createInterface({
    input: fs.createReadStream(loc),
});

let index = 0;
read.on('line', (data) => {
    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (e) {
        console.log('error', e.message);
    }

    if (jsonData.user.age) {
        console.log(jsonData);
    }

    // if (index > 100) process.exit();
    index++;
});

  