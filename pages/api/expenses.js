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
      message: 'User not authenticated ',
    });
  }

  const getExpenses = async (userId) => {
    try {
      const [expenses] = await pool.query(
        `SELECT expenses.id, expenses.title, expenses.sum, 
        expenses.date, expenses.notes, categories.id AS category_id, categories.label, categories.type, categories.icon FROM expenses
        INNER JOIN categories ON (expenses.category_id = categories.id)
        WHERE expenses.user_id = (?)`,
        [userId]
      );

      const expensesWithCategory = expenses.map((expense) => {
        const withCategory = {
          id: expense.id,
          title: expense.title,
          sum: +expense.sum,
          date: expense.date,
          category: {
            id: expense.category_id,
            label: expense.label,
            type: expense.type,
            icon: expense.icon,
          },
          notes: expense.notes,
        };

        return withCategory;
      });
      return expensesWithCategory;
    } catch (error) {
      throw Error(error);
    }
  };

  const addExpense = async (req, userId) => {
    const { title, sum, date, category, notes } = req.body;
    const data = [title, sum, date, category.id, notes, userId];

    try {
      await pool.query(
        'INSERT INTO expenses (title, sum, date, category_id, notes, user_id) VALUES (?)',
        [data]
      );

      return getExpenses(userId);
    } catch (error) {
      throw Error(error);
    }
  };

  const updateExpense = async (req) => {
    const { itemId, queryData } = req.body;
    const { title, sum, date, category, notes } = queryData;
    try {
      await pool.query(
        'UPDATE expenses SET title = (?), sum = (?), date = (?), category_id = (?), notes = (?) WHERE id = (?)',
        [title, sum, date, category.id, notes, itemId]
      );
      return getExpenses(userId);
    } catch (error) {
      throw Error(error);
    }
  };

  const deleteExpense = async (req) => {
    const { itemId } = req.body;

    try {
      await pool.query('DELETE FROM expenses WHERE id = (?)', [itemId]);

      return getExpenses(userId);
    } catch (error) {
      throw Error(error);
    }
  };

  if (req.method === 'GET') {
    try {
      const expenses = await getExpenses(userId);
      res.status(200).send(expenses);
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... unable to get data from server 🤷🏻‍♂️',
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const expenses = await addExpense(req, userId);
      res
        .status(201)
        .send({ message: 'Expense Added Successfully 👍🏻', data: expenses });
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... adding entry failed 👎🏻',
      });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const expenses = await updateExpense(req);
      res
        .status(201)
        .send({ message: 'Expense Updated Successfully 👍🏻', data: expenses });
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... updating entry failed 👎🏻',
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const expenses = await deleteExpense(req);
      res
        .status(201)
        .send({ message: 'Expense Deleted Successfully 👍🏻', data: expenses });
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... deleting entry failed 👎🏻',
      });
    }
  }
}

export default handler;
