import pool from 'lib/db-connection';
import bcrypt from 'bcryptjs';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

async function handler(req, res) {
  let userId = null;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    userId = session.user.id;
  } else {
    return res.status(401).json({
      ok: false,
      message: 'user not authenticated',
    });
  }


  if (req.method === 'POST') {
    const { enteredName, enteredEmail, enteredPassword, enteredAvatar } =
      req.body;

    if (
      !enteredName ||
      !enteredEmail ||
      !enteredPassword ||
      !enteredAvatar ||
      enteredPassword.trim() < 8 ||
      !enteredEmail.includes('@')
    ) {
      return res.status(400).json({
        ok: false,
        message: 'Credentials did not pass backend validation',
      });
    }

    const [existingUser] = await pool.query(
      'SELECT * FROM users WHERE email=(?)',
      [enteredEmail]
    );

    if (existingUser.length !== 0) {
      return res.json({
        ok: false,
        message: 'A user with the same email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(enteredPassword, 12);

    const data = [enteredName, enteredEmail, hashedPassword, enteredAvatar];

    await pool.query(
      'INSERT INTO users (name, email, password, avatar) VALUES (?)',
      [data]
    );

    pool.end();
    res.status(201).json({
      ok: true,
      message: 'User Stored Successfully',
    });
  }

  if (req.method === 'GET') {
    if (!userId) {
      res.status(401).json({ ok: false, message: 'User Not Authenticated' });
    }
    const { email } = req.body;

    try {
      const [user] = await pool.query('SELECT * FROM users WHERE email=(?)', [
        email,
      ]);
      pool.end();
      res.status(200).json(user);
    } catch (error) {
      pool.end();
      res.status(500).json({ ok: false, message: error.message });
    }
  }

  if (req.method === 'PATCH') {
    if (!userId) {
      res.status(401).json({ ok: false, message: 'not authenticated' });
    }

    const { name, password, avatar, userId } = req.body;
    const data = [name, password, avatar, userId];

    try {
      await pool.query(
        'UPDATE users SET name = (?), password = (?), avatar = (?) WHERE id = (?)',
        [name, password, avatar, userId]
      );
      res.status(202).console.log('User Updated Successfully');
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  }
}

export default handler;
