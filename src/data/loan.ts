import { Schema, Document, model } from 'mongoose';

const loanSchema: Schema = new Schema({
    lender: { type: String, required: true },
    borrower: { type: String, required: true },
    category: { type: String, required: true },
    item: { type: String, required: true },
    startDate: { type: String },
    endDate: { type: String },
    paidOff: { type: Boolean, required: true },
});

export const LoanModel = model('Loan', loanSchema);