import mongoose, {Schema} from 'mongoose'
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
  },

  clients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
  ],

});

const clientSchema = new mongoose.Schema({

  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  adress: {
    street: {
      type: String,

    },
    number: {
      type: Number,

    },
    city: {
      type: String,

    }
  },
  phone: {
    ddd: {
      type: Number,

    },
    number: {
      type: Number,

    }
  },
  balance: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

});

const transactionSchema = new mongoose.Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
export const Client = mongoose.model('Client', clientSchema);
export const User = mongoose.model('User', userSchema);

