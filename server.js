const express = require('express');
// const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 
const app = express();

app.use(cors());

app.get('/proxy', async (req, res) => {
     const word = req.query.word; // Отримуємо ?word=... з URL
     if (!word) {
          return res.status(400).send('Не вказано слово');
     }
     console.log(word);
     
     const newWord = decodeURIComponent(word);
     console.log(newWord);
     
     // const url = `https://slovnyk.ua/index.php?${newWord}`;
     const url = `https://slovnyk.ua/index.php?s1=1&s2=93`;
     
     console.log(url);
     

     try {
          // const response = await axios.get(url, {
          const response = await fetch(url, {
               method: 'GET',
               headers: {
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
               'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
               'Accept-Language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
               },
               timeout: 60000 
          });
          // console.log(response.data);
          
          // const $ = cheerio.load(response.data);
          // console.log($);
          
               
          // const result = $('p.cont_p').toArray().map(el => $(el).text());
          // console.log(result);
          
          res.send(response.data);
     } catch (error) {
          if (error.code === 'ECONNABORTED') {
               res.status(504).send(є);
          } else {
               res.status(500).send('Помилка під час запиту');
          }
     }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Сервер працює на порту ${PORT}`);
});