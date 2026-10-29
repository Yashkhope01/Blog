
import mongoose from 'mongoose';

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI?.trim();

    if (!mongoUri) {
        throw new Error('MONGODB_URI is not configured');
    }

    try {
        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        throw new Error(`MongoDB connection failed: ${error.message}`, { cause: error });
    }
};

export default connectDB;

//1234567890
