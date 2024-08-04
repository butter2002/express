var express = require('express');
var router = express.Router();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
let client;

async function connectToDatabase() {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

connectToDatabase();

// CORSミドルウェアを使用
router.use(cors());

router.get('/', async (req, res) => {
  try {
    // データベース、コレクションを指定
    const database = client.db('notes');
    const notes = database.collection('notes');

    // idが1のドキュメントを取得
    const query = { id: 2 };
    const note = await notes.findOne(query);

    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
