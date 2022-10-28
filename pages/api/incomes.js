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

  const getIncomes = async (userId) => {
    try {
      const [incomes] = await pool.query(
        `SELECT incomes.id, incomes.title, incomes.sum, 
        incomes.date, incomes.notes, categories.id AS category_id, categories.label, categories.type, categories.icon FROM incomes
        INNER JOIN categories ON (incomes.category_id = categories.id)
        WHERE incomes.user_id = (?)`,
        [userId]
      );

      const incomesWithCategory = incomes.map((income) => {
        const withCategory = {
          id: income.id,
          title: income.title,
          sum: +income.sum,
          date: income.date,
          category: {
            id: +income.category_id,
            label: income.label,
            type: income.type,
            icon: income.icon,
          },
          notes: income.notes,
        };
        return withCategory;
      });

      return incomesWithCategory;
    } catch (error) {
      throw Error(error);
    }
  };

  const addIncome = async (req, userId) => {
    const { title, sum, date, category, notes } = req.body;
    const data = [title, sum, date, category.id, notes, userId];

    try {
      await pool.query(
        'INSERT INTO incomes (title, sum, date, category_id, notes, user_id) VALUES (?)',
        [data]
      );

      return getIncomes(userId);
    } catch (error) {
      throw Error(error);
    }
  };

  const updateIncome = async (req) => {
    const { itemId, queryData } = req.body;
    const { title, sum, date, category, notes } = queryData;
    try {
      await pool.query(
        'UPDATE incomes SET title = (?), sum = (?), date = (?), category_id = (?), notes = (?) WHERE id = (?)',
        [title, sum, date, category.id, notes, itemId]
      );

      return getIncomes(userId);
    } catch (error) {
      throw Error(error);
    }
  };

  const deleteIncome = async (req) => {
    const { itemId } = req.body;

    try {
      await pool.query('DELETE FROM incomes WHERE id = (?)', [itemId]);

      return getIncomes(userId);
    } catch (error) {
      throw Error(error);
    }
  };

  if (req.method === 'GET') {
    try {
      const incomes = await getIncomes(userId);
      res.status(200).send(incomes);
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... unable to get data from server 🤷🏻‍♂️',
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const incomes = await addIncome(req, userId);
      res
        .status(201)
        .send({ message: 'Income Added Successfully 👍🏻', data: incomes });
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... adding entry failed 👎🏻',
      });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const incomes = await updateIncome(req);
      res
        .status(201)
        .send({ message: 'Income Updated Successfully 👍🏻', data: incomes });
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... updating entry failed 👎🏻',
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const incomes = await deleteIncome(req);
      res
        .status(201)
        .send({ message: 'Income Deleted Successfully 👍🏻', data: incomes });
    } catch (error) {
      res.status(500).send({
        error,
        message: 'Something went wrong... deleting entry failed 👎🏻',
      });
    }
  }
}

export default handler;
