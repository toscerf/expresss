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
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    db.beers.drop();
    beers.forEach( async (beerName) => {
        let beer = require(`./step-05/beers/${beerName}.json`);
        db.beers.insert(beer);
    });
} 

initDb();


