import pool from 'lib/dbConnection';
import bcrypt from 'bcryptjs';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

async function handler(req, res) {
  let userId = null;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    userId = session.user.id;
  }

  const getUser = async (userId) => {
    if (!userId) {
      throw new Error({ message: 'Not authenticated' });
    }

    try {
      const [user] = await pool.query('SELECT * FROM users WHERE id=(?)', [
        userId,
      ]);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  const addUser = async (req) => {
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
      throw new Error({
        message: 'Credentials did not pass backend validation',
      });
    }

    try {
      const [existingUser] = await pool.query(
        'SELECT * FROM users WHERE email=(?)',
        [enteredEmail]
      );

      if (existingUser.length !== 0) {
        throw new Error({
          message: 'A user with the same email already exists',
        });
      }

      const hashedPassword = await bcrypt.hash(enteredPassword, 12);
      const data = [enteredName, enteredEmail, hashedPassword, enteredAvatar];

      await pool.query(
        'INSERT INTO users (name, email, password, avatar) VALUES (?)',
        [data]
      );

      return { message: 'User Created Successfully' };
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateUser = async (req, userId) => {
    if (!userId) {
      throw new Error({ message: 'Not authenticated' });
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
      res.status(500).json({ message: error.message });
    }
  };

  // const deleteUser = async (userId) => {
  //   try {
  //     await pool.query('DELETE FROM users WHERE id = (?)', [userId]);

  //     return { message: 'User Deleted Successfully' };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  if (req.method === 'GET') {
    try {
      const user = await getUser(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error, message: 'Fetching Failed' });
    }
  }

  if (req.method === 'POST') {
    try {
      const user = await addUser(req, userId);
      res.status(201).json({ message: 'User Stored Successfully' });
    } catch (error) {
      res.status(500).json({ error, message: 'Adding Failed' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const user = await updateUser(req);
      res
        .status(201)
        .json({ message: 'User Updated Successfully', data: user });
    } catch (error) {
      res.status(500).json({ error, message: 'Updating Failed' });
    }
  }

  //   if (req.method === 'DELETE') {
  //     try {
  //       const user = await deleteUser(req);
  //       res
  //         .status(201)
  //         .json({ message: 'User Deleted Successfully', data: user });
  //     } catch (error) {
  //       res.status(500).json({ error, message: 'Deleting Failed' });
  //     }
  //   }
}

export default handler;
