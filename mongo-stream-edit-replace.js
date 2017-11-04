const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://192.168.0.44:27017/abacus';
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
    cursor.on('data', async (obj) => {

      if (obj.analytics) {
        const newAnalytics = obj.analytics.map((row) => {
          const newRow = {};
          if (row.date) newRow.date = row.date;
      
          if (row.views) newRow.views = row.views;
          if (row.visits) newRow.visits = row.visits;
          if (row.engaged) newRow.engaged = row.engaged;
          if (row.recirc) newRow.recirc = row.recirc;
          if (row.scroll) newRow.scroll = row.scroll;
          
          
          if (row.continent) newRow.continent = row.continent;
          if (row.country) newRow.country = row.country;
          if (row.platform) newRow.platform = row.platform;
          if (row.entry) newRow.entry = row.entry;
          if (row.app) newRow.app = row.app;
      
          if (row.ref_search) newRow.ref_search = row.ref_search;
          if (row.ref_term) newRow.ref_term = row.ref_term;
          if (row.bbc_news) newRow.bbc_news = row.bbc_news;
          if (row.ref_social) newRow.ref_social = row.ref_social;
          
          return newRow;
        });
        obj.analytics = newAnalytics;
      }
      

      try {
        await db.collection(collection).replaceOne({_id: obj._id}, obj);
      } catch (e) {
        console.log(e.message);
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
