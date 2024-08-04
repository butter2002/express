var express = require('express');
var router = express.Router();
const cors = require('cors');
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://butter2002pp:MyG9dSyqnqE00yeo@test.ycp4yxb.mongodb.net/?retryWrites=true&w=majority&appName=test&tls=true";
const client = new MongoClient(uri, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000
});

// CORSミドルウェアを使用
router.use(cors());

// MongoDBへの接続をアプリケーションの開始時に行う
client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection failed:', err));

router.get('/', async (req, res) => {
  try {
    // データベース、コレクションを指定
    const database = client.db('notes');
    const notes = database.collection('notes');

    // 全てのドキュメントを取得
    const note = await notes.find({}).toArray();
    console.log('Notes fetched successfully:', note);

    res.json(note);
  } catch (error) {
    // エラーハンドリング
    console.error('Error occurred while fetching notes:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

// アプリケーション終了時に接続を閉じる
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error occurred while closing MongoDB connection:', error);
    process.exit(1);
  }
});
