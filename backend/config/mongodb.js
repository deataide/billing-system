import mongoose from 'mongoose'
import "dotenv/config";

// eslint-disable-next-line no-undef
mongoose.connect('mongodb://localhost:27017/');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    default: false
  },
  recuperationToken: {
    type: String
  }
});

export const User = mongoose.model('User', userSchema);

