const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hungalex888',      // hoặc '123456' nếu bạn đã đặt
  database: 'web_project'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL Connected!');
});

module.exports = connection;