//Student Name: Praveen Kumar Siddela
//Student id: 1227371004
//Date: 02/18/2024

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 3000;
const dbName = 'EmploymentDB';

// MongoDB connection string
const url = `mongodb+srv://praveenkumarsiddelaasu:Praveen5@m3a1.u0kjwhr.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(url);
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Failed to connect to MongoDB Atlas', err);
        process.exit(1);
    }
}

// GET route
app.get('/items', async (req, res) => {
    try {
        const db = client.db('EmploymentDB');
        const collection = db.collection('Employee_Details');
        const items = await collection.find({}).toArray(); // Fetch all items from the collection

        res.status(200).json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send('Failed to fetch items from the database.');
    }
});

// POST route to create a new item
app.post('/items', async (req, res) => {
    try {
        const db = client.db('EmploymentDB');
        const collection = db.collection('Employee_Details');
        const result = await collection.insertOne(req.body);

        if (result.acknowledged) {
            const insertedDocument = await collection.findOne({ _id: result.insertedId });
            res.status(201).json(insertedDocument);
        } else {
            throw new Error('Document insert failed');
        }
    } catch (err) {
        console.error('Error creating a new item:', err);
        res.status(500).send(`Failed to create a new item: ${err.message}`);
    }
});

// PUT route to update an existing item
app.put('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const db = client.db('EmploymentDB');
        const collection = db.collection('Employee_Details');
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            res.status(404).send('No document matches the provided id.');
        } else {
            res.status(200).send('Document updated successfully.');
        }
    } catch (err) {
        console.error('Error updating the item:', err);
        res.status(500).send(`Failed to update the item: ${err.message}`);
    }
});

// DELETE route to remove an existing item
app.delete('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = client.db('EmploymentDB');
        const collection = db.collection('Employee_Details');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            res.status(404).send('No document matches the provided id.');
        } else {
            res.status(200).send('Document deleted successfully.');
        }
    } catch (err) {
        console.error('Error deleting the item:', err);
        res.status(500).send(`Failed to delete the item: ${err.message}`);
    }
});

app.listen(port, async () => {
    await connectToMongoDB(); // Ensure MongoDB connection is established before accepting requests
    console.log(`Server running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});
