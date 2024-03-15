const { MongoClient } = require('mongodb');
const customerLoan = require('../models/loanModel')

class LoanDbContext {
    constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
}
async connect() {
    if (!this.db) {
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    console.log('Connected to MongoDB:', this.dbName);
}
}
async insertSampleData(data) {
    try {
        await this.connect();
        //const collection = this.db.collection(collectionName);
        const newLoan = await customerLoan.insertMany(data);
        //const result = await collection.insertMany(data);
        console.log(`${newLoan.length} items inserted.`);
        return newLoan;
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

async getLoans(collectionName) {
    try {
        await this.connect();
        const getLoans = await collectionName.find();
        console.log(getLoans);
        return getLoans;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async updateLoans(id,data) {
    try {
        await this.connect();
        const updatedLoan = await customerLoan.findByIdAndUpdate(id, data, { new: true });
        console.log('Updated loan:', updatedLoan);
        return updatedLoan;
      } catch (error) {
        console.error('Error updating loan:', error);
      }
}

async deleteLoanById(id) {
    try {
      await this.connect();
      const deletedLoan = await customerLoan.findByIdAndDelete(id);
      console.log('Deleted loan:', deletedLoan);
      return deletedLoan;
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  }

async close() {
    if (this.client) {
        await this.client.close();
        console.log('Connection to MongoDB closed.');
    }

}
}

module.exports = LoanDbContext;
