import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://bejaouihelmi:yADIWCzUNmb6mygA@cluster0.3hb7bmg.mongodb.net/?retryWrites=true&w=majority";

const clientDb = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const waterPlant = async (gardeners) => {
  try {
    await clientDb.connect();
    console.log("Successfully connected to MongoDB!");

    const database = clientDb.db("garden");
    const collection = database.collection("garden");
    const findQuery = { guildID: gardeners.guildID };

    await collection.findOneAndUpdate(
      findQuery,
      {
        $set: { lastWateredTimestamps: gardeners.lastWateredTimestamps, plants: gardeners.plants }
      });
  } catch (err) {
    console.error(`Error occurred while trying to find the documents: ${err}\n`);
  } finally {
    await clientDb.close();
  }
}

export default async (guildID) => {
  await waterPlant(guildID);
}
