const fs = require('fs');
const readline = require('readline');

const input = './duration.csv';
const output = './duration-redis.txt';

const read = readline.createInterface({
    input: fs.createReadStream(input),
});

const skipFirstLine = true;
const splitter = ',';

let index = 0;

if (fs.existsSync(output)) fs.unlinkSync(output);

read.on('line', (data) => {
    if (index === 0) {
        index++;
        return;
    }

    const str = data.replace(/"/g,'');
    const arr = str.split(splitter);
    
    const json = { duration: parseInt(arr[1], 10) };
    fs.appendFileSync(output, ` SET "dur-${arr[0]}" '${ JSON.stringify(json) }' \n`);
    index++;
});

read.on('close', () => {
    console.log(`Finsihed writing ${index} files`);
});
