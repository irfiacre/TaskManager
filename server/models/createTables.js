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

CREATE TABLE IF NOT EXISTS tasks(
  id SERIAL PRIMARY KEY,
  taskDescription VARCHAR(500) NULL,
  scheduleDate TIMESTAMP NULL,
  dueDate TIMESTAMP NULL,
  status BOOLEAN DEFAULT FALSE,
  createdOn TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

const tables = async () => {
  await pool.query(tablesCreator).then(() => {
    console.log('Tables Created');
    pool.end();
  }).catch(() => {
    process.exit(0);
  });
};

tables();
