const fs = require('fs');
const readline = require('readline');
const zlib = require('zlib');

const input = './id_profile170922_dan.csv';
const output = './demographics-redis.txt'

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
    const arr = data.split(splitter);
    const json = { age: arr[2], gender: arr[3] };
    fs.appendFileSync(output, ` SET "hid-${arr[1]}" '${JSON.stringify(json)}' \n`);
    index++;
});

read.on('close', () => {
    console.log(`Finsihed writing ${index} files`);
    const compressed = zlib.gzipSync(output);
    fs.writeFileSync('./demographics-redis.txt.gz', compressed);
});
