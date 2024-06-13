var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res, next) {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    const data = response.data;
    const dogImageUrl = data.message;
    res.send(`<img src="${dogImageUrl}" alt="Dog Image">`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
