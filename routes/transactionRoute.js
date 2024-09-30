import express from 'express';
import { issueBook, returnBook, getTransactionsByBookName, getTotalRentForBook, getBooksIssuedToUser } from '../controller/transactionController.js';

const router = express.Router();

router.post('/transactions/issue', issueBook);
router.post('/transactions/return', returnBook);
router.get('/transactions/book', getTransactionsByBookName);
router.get('/transactions/book/rent', getTotalRentForBook);
router.get('/transactions/user', getBooksIssuedToUser);

export default router;