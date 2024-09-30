import mongoose from "mongoose";

var bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    rentPerDay: {
        type: String,
        required: true,
    },
});

 export default mongoose.model('Book', bookSchema);