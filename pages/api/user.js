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

  const getUser = async () => {
    try {
      const [user] = await pool.query('SELECT * FROM users WHERE id=(?)', [
        userId,
      ]);

      return user[0];
    } catch (error) {
      throw Error(error.message);
    }
  };

  const addUser = async (req) => {
    const { enteredName, enteredEmail, enteredPassword, enteredAvatar } =
      req.body;

    if (
      !enteredName ||
      !enteredEmail ||
      !enteredPassword ||
      enteredPassword.trim() < 8 ||
      !enteredEmail.includes('@')
    ) {
      throw Error('Credentials did not pass validation');
    }

    try {
      const [existingUser] = await pool.query(
        'SELECT * FROM users WHERE email=(?)',
        [enteredEmail]
      );

      if (existingUser.length !== 0) {
        throw Error('A user with the same email already exists');
      }

      const hashedPassword = await bcrypt.hash(enteredPassword, 12);
      const data = [enteredName, enteredEmail, hashedPassword, enteredAvatar];

      await pool.query(
        'INSERT INTO users (name, email, password, avatar) VALUES (?)',
        [data]
      );

      const user = await pool.query('SELECT * FROM users WHERE email=(?)', [
        enteredEmail,
      ]);
      return user;
    } catch (error) {
      throw Error(error.message);
    }
  };

  const updateUser = async (req) => {
    const { id, name, password, avatar } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      await pool.query(
        'UPDATE users SET name = (?), password = (?), avatar = (?) WHERE id = (?)',
        [name, hashedPassword, avatar, id]
      );

      const user = await getUser(userId);
      return user;
    } catch (error) {
      throw Error(error.message);
    }
  };

  // const deleteUser = async (userId) => {
  //   try {
  //     await pool.query('DELETE FROM users WHERE id = (?)', [userId]);

  //     return { message: 'User Deleted Successfully' };
  //   } catch (error) {
  //     throw  Error(error);
  //   }
  // };

  if (req.method === 'GET') {
    try {
      const user = await getUser(userId);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... unable to get data from server 🤷🏻‍♂️',
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const user = await addUser(req);
      res
        .status(201)
        .send({ message: 'User Added Successfully 👍🏻', data: user });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const user = await updateUser(req);
      res
        .status(201)
        .send({ message: 'User Updated Successfully 👍🏻', data: user });
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... updating profile failed 👎🏻',
      });
    }
  }

  //   if (req.method === 'DELETE') {
  //     try {
  //       const user = await deleteUser(req);
  //       res
  //         .status(201)
  //         .send({ message: 'User Deleted Successfully 👍🏻', data: user });
  //     } catch (error) {
  //       res.status(500).send({ error, message: 'Deleting Failed' });
  //     }
  //   }
}

export default handler;
