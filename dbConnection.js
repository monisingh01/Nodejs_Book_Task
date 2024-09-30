import mongoose from 'mongoose';



const connectDB = async () => {
try {
  await mongoose.connect(process.env.DATABASE_URL)
    console.log("MongoDB Connected Successfully")
}
catch (error) {
    console.log("MongoDB Connection Error",error.message)
}
}

export default connectDB