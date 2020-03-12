import pool from '../config/db_config';

const tablesCreator = `
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(35) UNIQUE NOT NULL,
  firstName VARCHAR(21) NOT NULL,
  lastName VARCHAR(22) NOT NULL,
  password VARCHAR(300) NOT NULL ,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS tasks(
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description VARCHAR(500),
  schedule_date TIMESTAMP,
  due_date TIMESTAMP,
  status VARCHAR(30) DEFAULT 'pending',
  created_on TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

const tables = async () => {
  await pool.query(tablesCreator).then(() => {
    console.log('Tables Created');
    pool.end();
  }).catch((err) => {
    console.log(err)
    process.exit(0);
  });
};

tables();
