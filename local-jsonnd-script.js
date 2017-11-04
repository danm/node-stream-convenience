const fs = require('fs');
const readline = require('readline');

const loc = '/Users/daniel/git/npm/nodestash/example/tmp_mongo.ndjson';

const read = readline.createInterface({
    input: fs.createReadStream(loc),
});

let index = 0;
read.on('line', (data) => {
    const json = JSON.parse(data);
    if (json.bbc.countername.includes('zhongwen')) {
        console.log(data);
        process.exit() 
    } else {
        
    }
    
});

read.on('close', () => {
    console.log(index);
});

  