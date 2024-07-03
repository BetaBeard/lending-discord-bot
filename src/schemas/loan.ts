import { Schema, Document, model } from 'mongoose';

// Define a schema for the loan collection in MongoDB
const loanSchema: Schema = new Schema({
    lender: { type: String, required: true },    // The lender's name, a required string
    borrower: { type: String, required: true },  // The borrower's name, a required string
    category: { type: String, required: true },  // The category of the item, a required string
    item: { type: String, required: true },      // The name of the item, a required string
    startDate: { type: String },                 // The start date of the loan, an optional string
    endDate: { type: String },                   // The end date of the loan, an optional string
    paidOff: { type: Boolean, required: true },  // Indicates whether the loan is paid off, a required boolean
});

// Create a Mongoose model for the loan schema
export const LoanModel = model('Loan', loanSchema);
