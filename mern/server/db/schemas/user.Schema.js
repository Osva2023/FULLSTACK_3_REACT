// userModel.js
import mongoose from 'mongoose';
//import { getDb } from '/Users/gloriagomez/osvaldo/Codeboxx/FULLSTACK_2_MERN/mern/server/db/conn.js';  //change these later

const userSchema = new mongoose.Schema({
 first_name: { type: String, required: true },
 last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, );

export default User;