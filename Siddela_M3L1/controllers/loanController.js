const {LoanDbContext} = require('../dataBasemanager/loanDbContext');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

const dbUrl = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}`
const dbName = process.env.DATABASE;
const collectionName = 'loanDetails';
const loanDbContext = new LoanDbContext(dbUrl, dbName)


exports.createLoan = async (req, res) => {
    const newCustomer = req.body;
    const dateTime = new Date().toISOString();
    const newcustomerLoan = {...newCustomer, loanIssueDate: dateTime};
    
    try {
        //Connection to database can be acheived inside loanDbContext
        const customerloan = await loanDbContext.insertSampleData(newcustomerLoan)
        res.status(201).json({
            status: 'Successfully created Customer Loan',
            data: customerloan
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed to Create customer Loan',
            message: err
        });
    } finally{
        await loanDbContext.close();
    }
};

exports.getLoans = async(req,res) => {
    try {
        //Connection to database can be acheived inside loanDbContext
        const loans = await loanDbContext.getLoans(collectionName)
        res.status(201).json({
            status: 'Successfully found Customer Loan',
            data: loans
        });
    } catch (err) {
        res.status(404).json({
            status: 'Unable to find customer Loan',
            message: err
        });
    } finally{
        await loanDbContext.close();
    } 
};

exports.updateLoan = async(req,res) => {
    try {
        //Connection to database can be acheived inside loanDbContext
        const data = req.body;
        const id = req.params.id;
        const loans = await loanDbContext.updateLoans(id,data)
        res.status(201).json({
            status: 'Successfully Updated Customer Loan',
            data: loans
        });
    } catch (err) {
        res.status(404).json({
            status: 'Unable to Update customer Loan',
            message: err
        });
    } finally{
        await loanDbContext.close();
    } 
};

exports.deleteLoan = async(req,res) => {
    try {
        //Connection to database can be acheived inside loanDbContext
        const id = req.params.id;
        const loans = await loanDbContext.deleteLoanById(id)
        res.status(201).json({
            status: 'Successfully Deleted Customer Loan',
            data: loans
        });
    } catch (err) {
        res.status(404).json({
            status: 'Unable to delete Customer Loan',
            message: err
        });
    } finally{
        await loanDbContext.close();
    } 
};
