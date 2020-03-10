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
        error: 'Email already exists'
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
    }, process.env.JWT_KEY,{
        expiresIn:'24h' 
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
  }
