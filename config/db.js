const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'honeyApp',
  });
  mongoose.set('strictQuery', false);

  console.log('MongoDB Connected'.bold.green.inverse);
};

module.exports = connectDB;
