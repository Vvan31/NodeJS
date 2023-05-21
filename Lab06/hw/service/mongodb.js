const { MongoClient } = require('mongodb');

const data = require('../data/recipes.json');
const URL = process.env.MONGO_URL, dbName = process.env.MONGO_DB_NAME;

const mongoConnect = async () => {
    const dbo = await MongoClient.connect(URL);
    console.log(`Connected to ${dbName}!`);

    const dbList = await dbo.db().admin().listDatabases();
    const dbExists = dbList.databases.find(db => db.name === dbName);

    if (!dbExists) {
        // Create database and seed data
       /*  await dbo.db().createCollection('recipes');
        console.log(`Created ${dbName}!`);

        const recipes = dbo.db().collection('recipes');
        await recipes.insertMany(data);
        console.log(`Inserted ${data.length} recipes!`); */
        // Access collection
        const recipes =  dbo.db(dbName).collection('recipes');
    }


    // Specify database name from collection you want to use
    return await dbo.db(dbName);
}

module.exports = { mongoConnect }