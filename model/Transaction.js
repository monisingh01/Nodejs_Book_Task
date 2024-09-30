import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    rent: { type: Number },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
