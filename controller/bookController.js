 import Book from '../model/Book.js';


export const createBook = async (req, res) => {
    const { bookName, category, rentPerDay } = req.body

    try {
        const existingBook = await Book.findOne({ bookName })
        if (existingBook) {
            return res.status(404).json({ message: 'Book already exists' })
        }

        const book = await Book.create({
            bookName,
            category,
            rentPerDay,
        })
        res.status(201).json({
            message: 'Book created successfully',
            book,
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

}


export const getAllBooks = async (req, res) => {
    try {
        const book = await Book.find()
        return res.status(200).json(book)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}




export const getBooksByName = async (req, res) => {

    const { bookName } = req.query

    if (!bookName) {
        return res.status(400).json({ message: 'bookName query parameter is required' });
    }
    try {
        const book = await Book.find({ bookName: bookName })

        if (book.length === 0) {
            return res.status(404).json({ message: 'No book found with the given name' })
        }

        return res.status(200).json(book)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}




export const getBookByRent = async (req, res) => {
    const { minRent, maxRent } = req.query
    if (!minRent || !maxRent) {
        return res.status(400).json({ message: 'Both minRent and maxRent query parameters are required' });
    }
    try {
        const book = await Book.find({
            rentPerDay:
            {
                $gte: minRent,
                $lte: maxRent
            }
        })

        if (book.rentPerDay === 0) {
            return res.status(404).json({ message: 'No book found with the given rent per day' })
        }
        return res.status(200).json(book)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}








export const getBookByFilter = async (req, res) => {
    const { category, bookName, minRent, maxRent } = req.query

    const query = {}

    if(category){
        query.category = category;
    }

    if(bookName){
        query.bookName = bookName;
    }
    if(minRent || maxRent){
        query.rentPerDay = {
            $gte: minRent,
            $lte: maxRent
        }
    }
    try {
        const book = await Book.find(query)
        return res.status(200).json(book)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
