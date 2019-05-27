// подключение к БД Postgresql через PG
const { Client } = require('pg')

// параметры для подключения
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'len0v0',
  database: 'api'
});

// функция получает всех пользователей из таблицы
exports.getUsers = () => new Promise(async (resolve, reject) => {
  client.connect(); // соединение с БД
  client.query('SELECT id, name, email FROM users ORDER BY id ASC', (err, res) =>{
    if(err) { // вернуть в случае ошибки
      console.log(err.stack);
      reject(err);
    } else { // вернуть если нет ошибок
      // console.log("res.row",res.rows);
      resolve(res.rows); // возвращает значания из таблицы
    }
  })
});

exports.getUserById = ({id}) => new Promise(async (resolve, reject) => {
  client.connect();
  console.log("id",id);
  client.query('SELECT * FROM users WHERE id = $1', [id], (err, res) =>{
    if(err) {
      console.log(err.stack);
      reject(err);
    } else {
      console.log("res.row",res.rows);
      resolve(res.rows);
    }
  })
});

exports.checkEmail = ({email}) => new Promise(async (resolve, reject) => {
    client.connect();
    console.log("email",email);
    client.query('SELECT * FROM users WHERE email = $1', [email], (err, res) =>{
        if(err) {
            console.log(err.stack);
            reject(err);
        } else {
            console.log("res.row",res);
            if(res.rowCount == 0)
                resolve(false)
            else
                resolve(true);
        }
    })
});


// делает запись в таблицу по соответствующим параметрам
exports.createUser = ({name, email, password}) => new Promise(async (resolve, reject) => {
  if (!name || !email || !password) {
    resolve({ // если не будет одного из полей то вернет ошибку
      success: false,
      message: 'values undefined'
    });
    return;
  }

  client.connect();

  client.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
  [name, email, password], (err, res) =>{
    if(err) {
      console.log(err.stack);
      reject(err);
    } else { // при удачной записи вернуть положительный ответ
      resolve({
        success: true,
        message: 'user is craeted'
      });
    }
  })
});
