require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const cors =  require('cors')
const mongoose = require('mongoose')


const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
    useCreateIndex: true,
    useFindAndModify:  false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connect to MongoDB')
})


app.use('/api', require('./routes/userRouter'))


const PORT = process.env.PORT || 5000


app.get('/', (req, res) => {
  res.json({msg: 'hello'})
});

app.listen(PORT, () => {
  console.log('Sever running on port', PORT);
});

