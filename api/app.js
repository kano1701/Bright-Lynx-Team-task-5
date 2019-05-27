// подключаем библиотеки
const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

const koaBody = require('koa-body');
const router = require('./apiRouter');

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(cors());

// зпуск сервера на порте 3000
app.listen(3000, () => {
  console.log('http://localhost:3000');
});
