import pool from 'lib/dbConnection';
import bcrypt from 'bcryptjs';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

async function handler(req, res) {
  let userId = null;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    userId = session.user.id;
  } else {
    res.status(401).send({
      error: 'unauthenticated user',
      message: 'User not authenticated ',
    });
  }

  try {
    const userEmail = session.user.email;
    const enteredPassword = req.body;

    const [existingUser] = await pool.query(
      `SELECT * FROM users WHERE email='${userEmail}'`
    );


    const passwordsMatch = await bcrypt.compare(
      enteredPassword,
      existingUser[0].password
    );

    if (passwordsMatch) {
      res.status(200).send({ message: 'Passwords match' });
    } else {
      res.status(401).send({ message: 'Wrong password - try again!' });
    }
  } catch (error) {
    throw Error(error.message);
  }
}

export default handler;
