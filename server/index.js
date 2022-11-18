const PORT = 8000;
const express = require('express');
const {MongoClient} =require('mongodb');
const uri = "mongodb+srv://admin:mypassword@cluster0.z7yi0me.mongodb.net/?retryWrites=true&w=majority";
// const uri = 'mongodb+srv://kubowania:mypassword@cluster0.ogxy5.mongodb.net/Cluster0?retryWrites=true&w=majority';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json("hello to my new App");
});


app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;

    const generatedUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await client.connect()
        const database = client.db('app-data');
        const users = database.collection('users');

        const existingUser = await users.findOne({ email });

        if(existingUser) {
            return res.status(409).send("User already exists! please Login");
        }
       
        const sanitizedEmail = email.toLowerCase();

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }

        const insertedUser = await users.insertOne(data);

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        })

        res.status(201).json({token, userId: generatedUserId })



   } catch(error){
        console.log(error);
   }

});

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;

    try {
        await client.connect()
        const database = client.db('app-data');
        const users = database.collection('users');
        const user = await users.findOne({email});
        const correctPassword = await bcrypt.compare(password, user.hashed_password);

        if(user && correctPassword){
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24,
            });

            res.status(201).json({token, userId: user.user_id});
        }

        res.status(400).send('Invalid Credentials !');
    } catch (error){
        console.log(error);
    }

});

// gendered users
app.get('/gendered-users', async (req, res) => {
   const client = new MongoClient(uri);
   let gender = req.query.gender;
  
   const query = { gender_identity: { $eq: gender}};

   try {
        await client.connect()
        const database = client.db('app-data');
        const users = database.collection('users');

        const foundUsers = await users.find(query).toArray();
        
        //  console.log(foundUsers);
        res.send( foundUsers );

   } finally {
    await client.close()
   }

});


// get indivdule User

app.get('/user', async (req, res) => {
    const client = new MongoClient(uri);
    const userId = req.query.userId
   
    try {
         await client.connect()
         const database = client.db('app-data');
         const users = database.collection('users');
 
         const query = {user_id: userId }
         const user = await users.findOne(query);

         res.send(user);
 
    } finally {
     await client.close()
    }
 
 });






// Update a User in the Database
app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: formData.user_id}

        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            },
        }

        const insertedUser = await users.updateOne(query, updateDocument)

        res.json(insertedUser)

    } finally {
        await client.close()
    }
})


app.put('/addmatch', async (req, res) => {
    const client = new MongoClient(uri);
    const {userIdConnected, matchedUserId} = req.body;
   
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userIdConnected}

        const payload = {
            $push: { matches: {user_id: matchedUserId} }
        }
        const updatedUser = await users.updateOne(query, payload);
        console.log(userIdConnected);
        res.send(updatedUser);


    } finally {
        await client.close();
    }
});

app.get('/getmatches', async (req, res) => {
    const client = new MongoClient(uri);
    const userIds = JSON.parse(req.query.userIds);
    const userCnnectedId = req.query.connectedId;

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        
        const pipeline = [
            {
                '$match': {
                    'user_id': {
                        '$in': userIds
                    }
                }
            }
        ];
        // const foundProfiles = await users.aggregate(pipeline).toArray();
        // const likedProfileIdsOfTheOpposition = foundProfiles && foundProfiles.matches.map(({ user_id }) =>  user_id )
        // const foundMatches = foundLinks?.filter(
        //     (userProfile) => likedProfileIdsOfTheOpposition.includes(userCnnectedId)
        // );
        const foundMatches = await users.aggregate(pipeline).toArray();
        const matches = foundMatches.map( (profile) => profile.matches);
        //  const likedProfileIdsOfTheOpposition = foundProfiles && foundProfiles.matches.map(({ user_id }) =>  user_id )
        console.log('matches__:'+  matches[1].user_id);

        res.send(foundMatches);

    }  finally {
        await client.close();
    }
});


app.get('/messages', async (req, res) => {
    const client = new MongoClient(uri);
    const { userId, correspondingUserId } = req.query;
   
    console.log('from_userId__:' + userId, 'to_userId__:' + correspondingUserId );

    try {
         await client.connect()
         const database = client.db('app-data');
         const messages = database.collection('messages');


         const query = {from_userId: userId, to_userId: correspondingUserId}
         const foundMessages = await messages.find(query).toArray();

         res.send(foundMessages);
 
    } finally {
     await client.close()
    }
 
 });





app.listen(PORT, () => console.log('server is running PORT:'+ PORT));