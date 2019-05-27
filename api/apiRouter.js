// роутинг, реакция на post и get запросы и перенаправление по страницам
const Router = require('koa-router');
const router = new Router();
const cors = require('@koa/cors');
const Api = require('./queries');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// get запрос для страницы со списком пользователей,
// асинхронно, вызывает функцию из Api, в случае неудачи вернет ошибку
router.get('/users', cors(corsOptions), async(ctx) => {
  try {
    const result = await Api.getUsers();
    ctx.status = 200;
    ctx.body = {
      "body": result
    };
  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = Internal.error;
  }
});

// get запрос получает получает данные о пользователе по его id,
// асинхронно, вызывает функцию из Api, в случае неудачи вернет ошибку
router.get('/users/:id', cors(corsOptions), async(ctx) => {
  try {
    const result = await Api.getUserById({id: ctx.params.id});
    ctx.status = 200;
    ctx.body = {
      "body": result
    };
  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = Internal.error;
  }
});
// post запрос, передает в теле цикла name, email, password
// асинхронно, вызывает функцию из Api, в случае неудачи вернет ошибку
router.post('/addUser', cors(corsOptions), async (ctx) => {
  try {
    console.log('ctx', ctx);
    const result = await Api.createUser({...ctx.request.body});
    ctx.body = result;
  } catch(err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = Internal.error;
  }
});

router.get('/addUser/:email', cors(corsOptions), async (ctx) => {
    try {
      console.log('------------------');
      console.log('ctx', ctx);
      console.log('ctx.params.email', ctx.params.email);
      const result = await Api.checkEmail({email: ctx.params.email});
      console.log('result', result)
      ctx.body = result;
    } catch(err) {
      console.error('err', err);
      ctx.status = 500;
      ctx.body = Internal.error;
    }
});

router.get('/', cors(corsOptions), async(ctx) => {
  ctx.body = 'Its works';
});



module.exports = router;
