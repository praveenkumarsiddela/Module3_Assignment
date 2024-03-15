const { MongoClient } = require('mongodb');

async function main() {
    const dbName = 'TestEmployee';
    const uri = `mongodb+srv://praveenkumarsiddelaasu:Praveen5@m3a1.u0kjwhr.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        // Perform database operations here
    } catch (err) {
        console.error('Database connection failed', err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
