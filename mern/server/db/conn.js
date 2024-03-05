import mongoose from 'mongoose';

export const connectToServer = async () => {
  console.log('Connecting to MongoDB...');
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("There was an error connecting to MongoDB: ", err);
  }
}