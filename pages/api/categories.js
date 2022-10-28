import pool from 'lib/dbConnection';
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
      throw Error(error);
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
      throw Error(error);
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
      throw Error(error);
    }
  };

  const deleteCategory = async (req) => {
    const { categoryId } = req.body;
    try {
      await pool.query('DELETE FROM categories WHERE id = (?)', [categoryId]);

      return getExpenses(userId);
    } catch (error) {
      throw Error(error);
    }
  };

  if (req.method === 'GET') {
    try {
      const categories = await getCategories(userId);
      res.status(200).send(categories);
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... unable to get data from server 🤷🏻‍♂️',
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const categories = await addCategory(req, userId);
      res
        .status(201)
        .send({ message: 'Category Added Successfully 👍🏻', data: categories });
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... adding category failed 👎🏻',
      });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const categories = await updateCategory(req);
      res.status(201).send({
        message: 'Category Updated Successfully 👍🏻',
        data: categories,
      });
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... updating category failed 👎🏻',
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const categories = await deleteCategory(req);
      res.status(201).send({
        message: 'Category Deleted Successfully 👍🏻',
        data: categories,
      });
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... deleting category failed 👎🏻',
      });
    }
  }
}

export default handler;
