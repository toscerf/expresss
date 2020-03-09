var MongoClient = require('mongodb').MongoClient;

var url = process.env.MONGODB_ADDON_URI;
var dbName = process.env.MONGODB_ADDON_DB;
var beers = [
    'AffligemBlond',
    'AffligemDubbel',
    'AffligemTripel',
    'ChimayRed',
    'ChimayTriple',
    'StBernardusAbt12',
    'StBernardusPater6',
    'StBernardusTripel',
    'TrappistesRochefort6',
    'TrappistesRochefort8',
    'TrappistesRochefort10'
]


async function initDb() {
    try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        if (db.beers) {
            let dropped = await db.beers.drop();
            console.log('DB dropped');
        }
        beers.forEach( async (beerName) => {
            let beer = require(`./step-05/beers/${beerName}.json`);
            let inserted = await db.beers.insert(beer);
            console.log(`Beer ${beerName} inserted`);
        });
    }
    catch(err) {
        console.log(err);
    }
}

initDb();
