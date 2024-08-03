var express = require('express');
var router = express.Router();
const axios = require('axios');
const cors = require('cors');

router.use(cors());

router.get('/', async function(req, res, next) {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
      headers: {
        'x-api-key': 'YOUR_API_KEY' // 必要に応じてAPIキーを設定
      }
    });
    const data = response.data;
    const catImageUrl = data[0].url;
    res.json([{ url: catImageUrl }]); // JSON形式でデータを返す
  } catch (error) {
    console.error(error); // コンソールにエラーメッセージを出力
    next(error); // エラーハンドリング
  }
});

module.exports = router;
