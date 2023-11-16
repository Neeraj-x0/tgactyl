
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs')
const { mongoURL } = require("../config.json")
const uri = mongoURL;

const mdClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function main() {
    let flag1 = false
    await mdClient.connect();
    console.log('Connected successfully to Database');
    const db = mdClient.db('MyBotDataDB');
    const collection = await db.collections();
    collection.forEach(ele => {
        if (ele.namespace == "MyBotDataDB.users") {
            flag1 = true;
        }
    });
    if (flag1 == false) {
        await db.createCollection("users");
    }
    return "done";
}

main();


module.exports = mdClient;
