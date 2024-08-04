var express = require('express');
var router = express.Router();
const cors = require('cors');
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://butter2002pp:MyG9dSyqnqE00yeo@test.ycp4yxb.mongodb.net/?retryWrites=true&w=majority&appName=test&tls=true";
const client = new MongoClient(uri, {
  connectTimeoutMS: 30000, // 接続タイムアウトを30秒に設定
  socketTimeoutMS: 45000   // ソケットタイムアウトを45秒に設定
});

// CORSミドルウェアを使用
router.use(cors());

router.get('/', async (req, res) => {
  try {
    // MongoDBへの接続を試みる
    await client.connect();
    console.log('Connected to MongoDB');

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
  } finally {
    // クライアント接続を閉じる
    try {
      await client.close();
    } catch (closeError) {
      console.error('Error occurred while closing MongoDB connection:', closeError);
    }
  }
});

module.exports = router;
