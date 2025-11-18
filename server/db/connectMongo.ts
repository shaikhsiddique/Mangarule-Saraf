import mongoose from 'mongoose';

let isConnected = 0; // 0=disconnected, 1=connected

export async function connectMongo() {
  if (isConnected) return;
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
  if (mongoose.connection.readyState === 1) {
    isConnected = 1;
    return;
  }
  console.log(process.env.MONGO_DB)
  await mongoose.connect(uri, { dbName: process.env.MONGO_DB || 'Man' });
  isConnected = 1;
}
