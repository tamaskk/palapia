import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
    const client = await MongoClient.connect('mongodb+srv://kalmantamaskrisztian:usPOHbel3rtVRvwS@cluster0.bftsemb.mongodb.net/datas?retryWrites=true&w=majority')
    return client;
};