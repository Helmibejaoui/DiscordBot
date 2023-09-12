import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://bejaouihelmi:yADIWCzUNmb6mygA@cluster0.3hb7bmg.mongodb.net/?retryWrites=true&w=majority";

const clientDb = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getGarden(guildId){
  try {
    await clientDb.connect();
    console.log("Successfully connected to MongoDB!");

    const collection = clientDb.db("garden").collection("garden");
    const findQuery = { guildID: guildId };

    let item = await collection.findOne(findQuery);

    if(!item){
      const garden = {
        guildID: guildId,
        plants: [],
        lastWateredTimestamps: {}
      }
      await collection.insertOne(garden);
      item = garden;
    }

    return item;
  } catch (err) {
    console.error(`Error occurred while finding the documents: ${err}\n`);
  } finally {
    await clientDb.close();
  }
}

export default async function (guildId) {
  return await getGarden(guildId);
}
