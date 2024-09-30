import Transaction from '../model/Transaction.js';
import Book from '../model/Book.js';
import User from '../model/User.js';

 export const issueBook = async (req, res) => {
    const { book:bookId, user:userId, issueDate } = req.body;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const book = await Book.findById({ _id: bookId });
        if (!book) {
            return res.status(400).json({ message: 'Book not available' });
        }
        const transaction = new Transaction({
            book: book._id,
            user: user._id,
            issueDate
        });
        await transaction.save();

         await book.save();

        res.status(201).json(transaction);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
};

export const returnBook = async (req, res) => {
    const { bookId, userId, returnDate } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const transaction = await Transaction.findOne({ book: bookId, user: userId, returnDate: null });
        if (!transaction) return res.status(404).json({ message: 'No active transaction found' });

         const parsedReturnDate = new Date(returnDate);
        transaction.returnDate = parsedReturnDate;
 
        const daysRented = (parsedReturnDate - new Date(transaction.issueDate)) / (1000 * 3600 * 24);
        transaction.rent = Math.ceil(daysRented) * book.rentPerDay;  
        await transaction.save();

          await book.save();

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


 export const getTransactionsByBookName = async (req, res) => {
    const { bookName } = req.query;
    try {
        const book = await Book.findOne({ bookName: bookName });
        
         if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

         const transactions = await Transaction.find({ book: book._id }).populate('user', 'name');
        
       
        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this book' });
        }

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


 export const getTotalRentForBook = async (req, res) => {
    const { bookName } = req.query;
    try {
        const book = await Book.findOne({ bookName: bookName });
        const transactions = await Transaction.find({ book: book._id });
        const totalRent = transactions.reduce((sum, t) => sum + (t.rent || 0), 0);
        res.status(200).json({ totalRent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const getBooksIssuedToUser = async (req, res) => {
    const { userId } = req.query;
    try {
        if(!userId){
            console.log("User not found");
        }
        const transactions = await Transaction.find({ user: userId }).populate('book', 'name');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};