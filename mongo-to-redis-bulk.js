const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const output = './cps-redis.txt';
const url = 'mongodb://192.168.0.44:27017/abacus';

const init = async () => {
    return new Promise(async (resolve) => {
        let index = 0;        
        let db;
        try {
            db = await MongoClient.connect(url);
            console.log('connected');
        } catch (e) {
            console.log(e.message);
        }
        
        const cps = db.collection('cps');
        const cursorStream = cps.find({ section_uri: { $exists: true } }).project({ section_uri: 1, site_name:1, type: 1, firstPublished: 1 });

        cursorStream.on('data', (d) => {
            const id = d._id;
            delete d._id;
            fs.appendFileSync(output, ` SET "cps-${id}" '${JSON.stringify(d)}' \n`);
            index++;
        });

        cursorStream.on('end', () => {
            console.log('end')
            resolve({index, db}); 
        });
    });
};

if (fs.existsSync(output)) fs.unlinkSync(output);

init().then((o) => {
    console.log(`Finsihed writing ${o.index} files`);
    o.db.close();
}).catch((e) => {
    console.log(e)
});