import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../config/db_config';

// the signup controller
export const signup = async (req, res) => {
  const emailFind = 'SELECT * FROM users WHERE email =$1';
  const { rows: [emailFound] } = await pool.query(emailFind, [req.body.email]);
  if (emailFound) {
    return res.status(409).json({
      status: 409,
      error: 'Email already exists',
    });
  }

  const user = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: await bcrypt.hash(req.body.password, 10),
    is_admin: false,
  };

  const inserterSql = 'INSERT INTO users(email,firstname,lastname,password,is_admin) VALUES($1,$2,$3,$4,$5) RETURNING *;';

  const { rows } = await pool.query(inserterSql,
    [user.email, user.firstName, user.lastName, user.password, user.is_admin]);

  const userFind = rows.find((obj) => obj.id);
  const token = jwt.sign({
    id: userFind.id,
    email: userFind.email,
  }, process.env.JWT_KEY, {
    expiresIn: '24h',
  });

  res.status(201).json({
    status: 201,
    data: {
      token,
      id: userFind.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
  });
};


export const signin = async (req, res) => {
  const emailFind = 'SELECT * FROM users WHERE email =$1';
  const { rows: [emailFound] } = await pool.query(emailFind, [req.body.email]);
  if (!emailFound) {
    return res.status(404).json({
      status: 404,
      error: 'The Email is not Found',
      path: 'email',
    });
  }

  const findPassword = 'SELECT * FROM users  WHERE email = $1;';
  const { rows: [passwordFound] } = await pool.query(findPassword, [req.body.email]);

  const password = await bcrypt.compare(req.body.password, passwordFound.password);
  if (!password) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid Password',
      path: 'password',
    });
  }

  const user = {
    id: passwordFound.id,
    firstName: passwordFound.firstname,
    lastName: passwordFound.lastname,
    email: req.body.email,
  };

  const token = jwt.sign({
    id: passwordFound.id,
    email: passwordFound.email,
    fullName: `${user.firstName}  ${user.lastName}`,
    is_admin: passwordFound.is_admin,
  }, process.env.JWT_KEY);

  res.status(200).json({
    status: 200,
    data: {
      token,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: passwordFound.type,
      is_admin: passwordFound.is_admin,
    },
  });
};
