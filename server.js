const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://shaki:ramesh@cluster0.dswqsts.mongodb.net/jvlcart', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define user schema and model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    newUser.save()
        .then(() => res.json({ message: 'User registered successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
