import express from 'express';
import { createBook, getAllBooks, getBooksByName, getBookByRent ,getBookByFilter} from '../controller/bookController.js'


const router = express.Router();

router.post('/books', createBook)

router.get('/getAllbooks', getAllBooks)

router.get('/books/search', getBooksByName)

router.get('/books/rent', getBookByRent)

router.get('/books/filter', getBookByFilter)



export default router;
