var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res, next) {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search');
    const data = response.data;
    const catImageUrl = data[0].url;
    res.send(`<img src="${catImageUrl}" alt="Cat Image">`);
  } catch (error) {
    next(error); // エラーハンドリングを追加
  }
});

module.exports = router;
