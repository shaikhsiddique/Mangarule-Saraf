import mongoose from 'mongoose';

let isConnected = 0; // 0=disconnected, 1=connected

export async function connectMongo() {
  if (isConnected) return;
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not set');
  if (mongoose.connection.readyState === 1) {
    isConnected = 1;
    return;
  }
  await mongoose.connect(uri, { dbName: process.env.MONGO_DB || undefined });
  isConnected = 1;
}


