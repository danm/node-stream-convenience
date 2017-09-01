const MongoClient = require('mongodb').MongoClient;
const BSON = require('mongodb-core').BSON;
const bson = new BSON();

const url = 'mongodb://localhost:27017/abacus';
const collection = 'cps';

const items = [];

const connect = () => {
  return new Promise(async (resolve, reject) => {
    let db;
    let cursor;
    try {
      db = await MongoClient.connect(url);
      cursor = db.collection(collection).find({});
    } catch (e) {
      reject(e);
    }
    let lines = 0;
    cursor.on('data', (obj) => {
      const size = bson.calculateObjectSize(obj);
      if (size > 10000000) {
        items.push({id: obj._id, size })
        console.log(obj._id, size);
      }

      //progress
      lines++
      if ((lines / 1000) % 1 === 0) {
        console.log(lines);
      }
    });

    cursor.on('end', () => {
      console.log(items);
      resolve();
    });
  });
};

connect().then(() => {
  console.log('finished');
}).catch((e) => {
  console.log(e.message, e.stack);
});
