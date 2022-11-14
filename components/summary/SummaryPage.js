import { useEffect, useState } from 'react';
import { queryTotalByCategory, getTrend } from 'lib/utilities/queryFilters';
import { DUMMY_QUERIES } from 'lib/utilities/initData';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { summaryPageVars } from 'lib/framer-variants';

import styles from './SummaryPage.module.css';
import SumRail from './sum-rail/SumRail';
import Graph from './graph/Graph';
import Info from './info/Info';

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
    <motion.div variants={summaryPageVars} className={styles.view}>
      {empty && (
        <div className={styles.placeholder}>
          <div className={styles.message}>
            <h3>Nothing to Show Yet!</h3>
            <p>
              There are no entries listed to summarize.
              <br /> Try adding some or adjusting the filters to make use of the
              summary section.
            </p>
            <Link href={'/add'}>
              <span className={styles.link}>Click Here To Add Entries</span>
            </Link>
          </div>
        </div>
      )}
      <SumRail
        queriesByCategory={
          empty
            ? DUMMY_QUERIES
            : queriesByCategoryWithTrend
            ? queriesByCategoryWithTrend
            : queriesTotalByCategory
        }
        list={props.list}
      />
      <Graph
        queriesByCategory={empty ? DUMMY_QUERIES : queriesTotalByCategory}
        list={props.list}
      />
      <Info
        queriesByCategory={
          empty
            ? DUMMY_QUERIES
            : queriesByCategoryWithTrend
            ? queriesByCategoryWithTrend
            : queriesTotalByCategory
        }
        list={props.list}
      />
    </motion.div>
  );
};

export default SummaryPage;
