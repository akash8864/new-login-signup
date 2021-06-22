const mongoose = require('mongoose');
const connectdb = async () => {
  try {
const conct = await mongoose.connect(process.env.MONGO_URI, 
  {
    useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true
  });
  console.log(`MongoDB Connected: ${conct.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);  
  }
}

module.exports = connectdb;