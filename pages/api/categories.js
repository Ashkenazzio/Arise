import pool from 'lib/dbConnection';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

async function handler(req, res) {
  let userId = null;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    userId = session.user.id;
  } else {
    return res.status(401).json({
      message: 'User not authenticated',
    });
  }

  const getCategories = async (userId) => {
    try {
      const [categories] = await pool.query(
        'SELECT * FROM categories WHERE user_id IS NULL OR user_id=(?)',
        [userId]
      );
      return categories;
    } catch (error) {
      throw new Error(error);
    }
  };

  const addCategory = async (req, userId) => {
    const { label, type, icon } = req.body;
    const data = [label, type, icon, userId];
    try {
      await pool.query(
        'INSERT INTO categories (label, type, icon, user_id) VALUES (?)',
        [data]
      );

      return getCategories(userId);
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateCategory = async (req) => {
    const { categoryId, queryData } = req.body;
    const { label, type, icon } = queryData;

    try {
      await pool.query(
        'UPDATE categories SET label = (?), type = (?), icon = (?) WHERE id = (?)',
        [label, type, icon, categoryId]
      );

      return getCategories(userId);
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteCategory = async (req) => {
    const { categoryId } = req.body;
    try {
      await pool.query('DELETE FROM categories WHERE id = (?)', [categoryId]);

      return getExpenses(userId);
    } catch (error) {
      throw new Error(error);
    }
  };

  if (req.method === 'GET') {
    try {
      const categories = await getCategories(userId);
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error, message: 'Fetching Failed' });
    }
  }

  if (req.method === 'POST') {
    try {
      const categories = await addCategory(req, userId);
      res
        .status(201)
        .json({ message: 'Category Stored Successfully', data: categories });
    } catch (error) {
      res.status(500).json({ error, message: 'Adding Failed' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const categories = await updateCategory(req);
      res
        .status(201)
        .json({ message: 'Category Updated Successfully', data: categories });
    } catch (error) {
      res.status(500).json({ error, message: 'Updating Failed' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const categories = await deleteCategory(req);
      res
        .status(201)
        .json({ message: 'Category Deleted Successfully', data: categories });
    } catch (error) {
      res.status(500).json({ error, message: 'Deleting Failed' });
    }
  }
}

export default handler;
