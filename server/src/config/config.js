const {DB_USER,DB_PASSWORD,DB_NAME,DB_HOST}= require('./server-config');

module.exports= {
    "development": {
      "username": DB_USER,
      "password": DB_PASSWORD,
      "database": DB_NAME,
      "host": DB_HOST,
      "dialect": "mysql"
    },
    "test": {
      "username": DB_USER,
      "password": DB_PASSWORD,
      "database": DB_NAME,
      "host": DB_HOST,
      "dialect": "mysql"
    },
    "production": {
      "username": DB_USER,
      "password": DB_PASSWORD,
      "database": DB_NAME,
      "host": DB_HOST,
      "dialect": "mysql"
    }
  }