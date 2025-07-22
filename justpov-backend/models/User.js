import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String, 
      required: true, 
      unique: true,
    }, 
    email: {
      type: String, 
      required: true, 
      unique: true,
    },
    password: { 
      type: String,
      required: true,
    },
    phone: String,
    role: {
      type: String,
      enum: ['employee', 'owner'],
      default: 'employee',
    },
  },
  {
    timestamps:true,
  }
);

export default model('User', UserSchema);
