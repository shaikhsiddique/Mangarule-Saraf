import mongoose from 'mongoose';

let isConnected = 0; // 0=disconnected, 1=connected

export async function connectMongo() {
  if (isConnected) return;
  const uri = "mongodb+srv://Prabhat:suprabhat123@cluster0.zjkfkty.mongodb.net/Man" 
  if (mongoose.connection.readyState === 1) {
    isConnected = 1;
    return;
  }
  await mongoose.connect(uri, { dbName: process.env.MONGO_DB || 'Man' });
  isConnected = 1;
}
