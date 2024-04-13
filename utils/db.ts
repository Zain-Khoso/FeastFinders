import mongoose from 'mongoose';

// And it returns nothing back.
export const connectToMongodb = async function () {
    // If there is already a connection stablished then return.
    if (mongoose.connection.readyState === 1) return;

    // Connecting to mongodb.
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('db connected.');
    } catch (err) {
        throw new Error('Unable to connect to mongodb.');
    }
};
