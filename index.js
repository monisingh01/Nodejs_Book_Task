import express from 'express';
import dotenv from 'dotenv'
import connectDB from './dbConnection.js'
import userRoutes from './routes/userRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import transactionRoutes from './routes/transactionRoute.js'
dotenv.config()

const app = express()
app.use(express.json())

app.use('/api', userRoutes)
app.use('/api', bookRoutes)
app.use('/api', transactionRoutes)

connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


