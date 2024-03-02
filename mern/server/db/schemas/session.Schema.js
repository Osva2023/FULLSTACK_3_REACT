// SESSION SCHEMA
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    sessionToken: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 }); 

const Session = mongoose.model('Session', sessionSchema);

export default Session;
