const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 
const app = express();

app.use(cors());

app.get('/proxy', async (req, res) => {
     const word = req.query.word; // Отримуємо ?word=... з URL
     if (!word) {
          return res.status(400).send('Не вказано слово');
     }
const newWord = decodeURIComponent(word);
     const url = `https://slovnyk.ua/index.php?${newWord}`;
     // const url = `https://slovnyk.ua/index.php?${newWorld.toString()}`;

     try {
          const response = await axios.get(url, {
               headers: {
               'User-Agent': 'Mozilla/5.0'
               },
               timeout: 60000 
          });
          const $ = cheerio.load(response.data);
               
          const result = $('p.cont_p').toArray().map(el => $(el).text());

          res.send(result);
     } catch (error) {
          if (error.code === 'ECONNABORTED') {
               res.status(504).send(url);
          } else {
               // res.status(500).send('Помилка під час запиту');
               res.status(500).send(word);
          }
     }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Сервер працює на порту ${PORT}`);
});