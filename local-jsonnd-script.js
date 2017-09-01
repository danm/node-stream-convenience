const fs = require('fs');
const readline = require('readline');

const loc = '/Users/daniel/git/npm/nodestash/example/2017-08-31-18-52-news-v2-26427483-0.json';

const read = readline.createInterface({
    input: fs.createReadStream(loc),
});

let index = 0;
read.on('line', (data) => {
    
    const json = JSON.parse(data);
    if (json.user && json.user.age) {
        console.log(json);
        index++;
        if (index > 10) process.exit();
    }
    

});

  