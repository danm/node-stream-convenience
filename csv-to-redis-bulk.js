const fs = require('fs');
const readline = require('readline');

const loc = './2017-09-25-00-00-news-v2-26975163-0.csv';

const read = readline.createInterface({
    input: fs.createReadStream(loc),
});

const skipFirstLine = true;
const splitter = ',';

let index = 0;
read.on('line', (data) => {
    if (index === 0) {
        index++;
        return;
    }

    index++;
    console.log(data);

    if (index > 100) process.exit();



    const arr = data.split(splitter);
    const json = { vpid: arr[0], duration: [1] };
    // fs.appendFileSync('./duration-redis.txt', `${JSON.stringify(json)} \n`);
});

read.on('close', () => {
    console.log(`Finsihed writing ${index} files`);
});

  