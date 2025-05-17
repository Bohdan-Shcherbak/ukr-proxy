const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/proxy', async (req, res) => {
     const word = req.query.word; // Отримуємо ?word=... з URL
     if (!word) {
          return res.status(400).send('Не вказано слово');
     }
     const url = `https://slovnyk.ua/index.php?${word}}`;

     try {
          const response = await axios.get(url, {
               headers: {
               'User-Agent': 'Mozilla/5.0'
               }
          });
          const $ = cheerio.load(response.data);
          const result = $('p.cont_p').toArray().map(el => $(el).html());
          res.send(result);
     } catch (error) {
          res.status(500).send('Помилка під час запиту');
     }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Сервер працює на порту ${PORT}`);
});