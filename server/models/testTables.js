import pool from '../config/db_config';

const tablesCreator = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(35) UNIQUE NOT NULL,
  firstName VARCHAR(21) NOT NULL,
  lastName VARCHAR(22) NOT NULL,
  password VARCHAR(300) NOT NULL ,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO users(email,firstname,lastname,password)VALUES('francoismugorozi@gmail.com','francois','mugorozi','$2b$10$K4EmRPE/zh/b6QxPQiVVaOtnq01okywVrxsJMFr8kL9L2qg24c5gS');

CREATE TABLE IF NOT EXISTS tasks(
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description VARCHAR(500) NOT NULL,
  schedule_date TIMESTAMP,
  due_date TIMESTAMP,
  status BOOLEAN DEFAULT FALSE,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

const tables = async () => {
  await pool.query(tablesCreator).then(() => {
    console.log('TEST Tables Created');
    pool.end();
  }).catch(() => {
    process.exit(0);
  });
};

tables();
