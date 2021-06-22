const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const auth = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(
    ` running at ${PORT} `
  )
);

