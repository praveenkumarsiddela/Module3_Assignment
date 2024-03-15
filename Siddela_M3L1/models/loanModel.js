const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
    {
        customerId:  {
            type: Number,
            required: [true, 'A customer must have a Id'],
            unique: true,
            maxlength: [4, 'A customer name must have 4 characters'],
            minlength: [4, 'A customer name must have 4 characters']
        },
        customerName:  {
            type: String,
            required: [true, 'A customer must have a name'],
            unique: false,
            trim: true,
            maxlength: [40, 'A customer name must have less than or equal to 40 characters'],
            minlength: [2, 'A customer name must have more than or equal to 2 characters']
        },
        customerEmail:  {
            type: String,
            required: false,
        },
        loanId: {
            type: Number,
            required: [true, 'A loan must have a Id'],
            unique: true,
            maxlength: [6, 'A loan must have 6 numbers'],
            minlength: [6, 'A loan must have 6 numbers']
        },
        loanAmount: {
            type: Number,
            required: [true, 'A loan amount is required'],
            unique: false,
            trim: true,
            max: [1000000, 'A loan amount must be less than or equal to 1000000'],
            min: [1, 'A loan amount must be more than or equal to 1']
        },
        loanIssueDate:{
            type:Date,
            default: Date.now,
            required: [true, 'A Issued date is required'],
            autopopulate: true,
        },
        loanStatus:{
            type:String,
            required:false
        },
        paymentId:{
            type: Number,
            required: [true, 'A payment id is required'],
            unique: true
        },
        paymentAmount: {
            type: Number,
            required: [true, 'A payment amount is required'],
            unique: false,
            trim: true,
            max: [1000000, 'A loan amount must be less than or equal to 1000000'],
            min: [1, 'A loan amount must be more than or equal to 1']
        },
        paymentDate: {
            type:Date,
            required: [true, 'A Issued date is required']
        }
});

const customerLoan = mongoose.model('loanDetails', loanSchema);

module.exports = customerLoan;