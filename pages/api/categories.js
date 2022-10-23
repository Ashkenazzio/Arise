import pool from 'lib/db-connection';
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
    const { label, type, icon } = req.body;
    const data = [label, type, icon, userId];

    try {
      await pool.query(
        'INSERT INTO categories (label, type, icon, user_id) VALUES (?)',
        [data]
      );

      const [categories] = await pool.query(
        'SELECT * FROM categories WHERE user_id IS NULL OR user_id=(?)',
        [userId]
      );

      res.status(201).json({
        ok: true,
        message: 'Category Stored Successfully',
        categories: categories,
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const [categories] = await pool.query(
        'SELECT * FROM categories WHERE user_id IS NULL OR user_id=(?)',
        [userId]
      );
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }
}

export default handler;
