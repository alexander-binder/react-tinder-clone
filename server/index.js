const PORT = 8000;
const express = require('express');
const {MongoClient} =require('mongodb');
const uri = "mongodb+srv://admin:mypassword@cluster0.z7yi0me.mongodb.net/?retryWrites=true&w=majority";
const app = express();


app.get('/', (req, res) => {
    res.json("hello to my new App");
});


app.post('/signup', (req, res) => {
    res.json("hello to my new App");
});


app.get('/users', async (req, res) => {
   const client = new MongoClient(uri);
   
   try {
        await client.connect()
        const database = client.db('app-data');
        const users = database.collection('users');

        const returnedUsers = await users.find().toArray();
        res.send(returnedUsers);

   } finally {
    await client.close()
   }

});








app.listen(PORT, () => console.log('server is running PORT:'+ PORT));