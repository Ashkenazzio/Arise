import styles from './SummaryPage.module.css';

import ExpenseRail from './expense-rail/ExpenseRail';
import Graph from './data-vis/Graph';
import Info from './info/Info';
import { useEffect, useState } from 'react';
import { queryTotalByCategory, getTrend } from 'lib/queryFilters';
import { DUMMY_QUERIES } from 'lib/initData';
import Link from 'next/link';

const SummaryPage = (props) => {
  const [queries, queryCompares] = props.queries;
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (queries.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [queries]);

  const queriesTotalByCategory = queryTotalByCategory(queries);
  let queriesByCategoryWithTrend;

  if (queryCompares) {
    const queryComparesTotalByCategory = queryTotalByCategory(queryCompares);
    queriesByCategoryWithTrend = getTrend(
      queryComparesTotalByCategory,
      queriesTotalByCategory
    );
  }

  return (
    <div className={styles.view}>
      {empty && (
        <div className={styles.placeholder}>
          <div className={styles.message}>
            <h3>Nothing to Show Yet!</h3>
            <p>You need to add entries to make use of the Summary section.</p>
            <Link href={'/add'}>
              <span className={styles.link}>Click Here To Add Entries</span>
            </Link>
          </div>
        </div>
      )}
      <ExpenseRail
        queriesByCategory={
          empty
            ? DUMMY_QUERIES
            : queriesByCategoryWithTrend
            ? queriesByCategoryWithTrend
            : queriesTotalByCategory
        }
      />
      <Graph
        queriesByCategory={empty ? DUMMY_QUERIES : queriesTotalByCategory}
      />
      <Info
        queriesByCategory={
          empty
            ? DUMMY_QUERIES
            : queriesByCategoryWithTrend
            ? queriesByCategoryWithTrend
            : queriesTotalByCategory
        }
      />
    </div>
  );
};

export default SummaryPage;
