import { motion } from 'framer-motion';
import {
  sectionElementVars,
  startBlockVars,
  startContainerVars,
  startSectionVars,
} from 'lib/framer-variants';

import styles from './Start.module.css';
import Image from 'next/image';
import untitled from '@/images/untitled.png';
import type_selector from '@/images/start_section/type_selector.png';
import new_category from '@/images/start_section/new_category.png';
import balance from '@/images/start_section/balance.png';
import edit_entries from '@/images/start_section/edit_entries.png';
import sum_cards from '@/images/start_section/sum_cards.png';
import graph from '@/images/start_section/graph.png';
import useful_info from '@/images/start_section/useful_info.png';

const Start = () => {
  return (
    <motion.div variants={startContainerVars} className={styles.view}>
      <header className={styles.nav}>
        <ul className={styles['nav-menu']}>
          <a href='#intro'>
            <li className={styles['nav-item']}>About</li>
          </a>
          <a href='#add'>
            <li className={styles['nav-item']}>Add</li>
          </a>
          <a href='#flow'>
            <li className={styles['nav-item']}>Flow</li>
          </a>
          <a href='#summary'>
            <li className={styles['nav-item']}>Summary</li>
          </a>
        </ul>
      </header>
      <div className={styles.container}>
        <motion.section
          variants={startSectionVars}
          id='intro'
          className={styles.intro}
        >
          <div className={`${styles.title} ${styles['main-title']}`}>
            <h1>Welcome🤗</h1>
            <span className={styles.subtitle}>
              Let&apos;s start lifting you up.
            </span>
          </div>
          <motion.div variants={startBlockVars} className={styles.block}>
            <motion.div variants={sectionElementVars} className={styles.text}>
              <h3 className={styles.title}>What is Arise?</h3>
              <p>
                Arise is a special kind of budget/expense tracker app.
                <br /> Instead of focusing only on the amount of money you
                spend, it reminds you to think more relatively with your own
                personal flow state of mind.
              </p>
            </motion.div>
            <motion.div variants={sectionElementVars} className={styles.img}>
              <Image
                style={{ borderRadius: '0.25rem', objectFit: 'cover' }}
                alt='main image'
                src={untitled}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          variants={startSectionVars}
          id='add'
          className={styles.intro}
        >
          <div className={styles.heading} data-number='1.'>
            <div className={styles.headings}>
              <h2 className={styles.title}>Add Entries</h2>
              <span className={styles.subtitle}>
                Add new entries and feed the app with your data.
              </span>
            </div>
          </div>
          <motion.div variants={startBlockVars} className={styles.block}>
            <motion.div variants={sectionElementVars} className={styles.text}>
              <h3 className={styles.title}>Adding an Entry</h3>
              <p>Fill all the required fields in order to add a new entry.</p>
              <p>
                Pay attention to the type selector, which sets the new entry as
                an expense (red) or an income (green).
              </p>
            </motion.div>
            <motion.div variants={sectionElementVars} className={styles.img}>
              <Image
                style={{ borderRadius: '0.25rem', objectFit: 'cover' }}
                alt='type selector'
                src={type_selector}
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={startBlockVars}
            className={`${styles.block} ${styles['block-alt']}`}
          >
            <motion.div variants={sectionElementVars} className={styles.text}>
              <h3 className={styles.title}>Missing a Category? Add One</h3>
              <p>
                You can easily add a new category by pressing the button next to
                the category selector.
              </p>
            </motion.div>
            <motion.div variants={sectionElementVars} className={styles.img}>
              <Image
                style={{ borderRadius: '0.25rem', objectFit: 'cover' }}
                alt='new category'
                src={new_category}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          variants={startSectionVars}
          id='flow'
          className={styles.intro}
        >
          <div className={styles.heading} data-number='2.'>
            <div className={styles.headings}>
              <h2 className={styles.title}>Browse Your Flow</h2>
              <span className={styles.subtitle}>
                Browse and compare your expenses and incomes.
              </span>
            </div>
          </div>
          <motion.div variants={startBlockVars} className={styles.block}>
            <motion.div variants={sectionElementVars} className={styles.text}>
              <h3 className={styles.title}>Your Balance</h3>
              <p>
                Your balance is the difference between your expenses and
                incomes. The balance component in the flow page will display it
                visually and numerically.
              </p>
            </motion.div>
            <motion.div variants={sectionElementVars} className={styles.img}>
              <Image
                style={{ borderRadius: '0.25rem', objectFit: 'cover' }}
                alt='balance component'
                src={balance}
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={startBlockVars}
            className={`${styles.block} ${styles['block-alt']}`}
          >
            <motion.div variants={sectionElementVars} className={styles.text}>
              <h3 className={styles.title}>Edit Your Entries</h3>
              <p>
                You can easily edit the entries you added by pressing them and
                entering edit mode. You can either change the details of the
                entry or delete it completely. Press the item again to exit item
                edit or confirm your changes by pressing the &apos;Edit&apos;
                button.
              </p>
            </motion.div>
            <motion.div variants={sectionElementVars} className={styles.img}>
              <Image
                style={{ borderRadius: '0.25rem', objectFit: 'cover' }}
                alt='edit entries'
                src={edit_entries}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          variants={startSectionVars}
          id='summary'
          className={styles.intro}
        >
          <div className={styles.heading} data-number='3.'>
            <div className={styles.headings}>
              <h2 className={styles.title}>Summarize And Adapt</h2>
              <span className={styles.subtitle}>
                Get insights on your financial activity.
              </span>
            </div>
          </div>
          <motion.div variants={startBlockVars} className={styles.block}>
            <motion.div variants={sectionElementVars} className={styles.text}>
              <h3 className={styles.title}>Sum Cards</h3>
              <p>
                Sum Cards comfortabely present you the total amount of money
                spent or gaind in a specific category, in a specific timeframe.
                If available, it presents the percentage change in comparison to
                the previous time frame.
              </p>
            </motion.div>
            <motion.div variants={sectionElementVars} className={styles.img}>
              <Image
                style={{ borderRadius: '0.25rem', objectFit: 'cover' }}
                alt='sum cards'
                src={sum_cards}
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={startBlockVars}
            className={`${styles.block} ${styles['block-alt']}`}
          >
            <motion.div variants={sectionElementVars} className={styles.text}>
              <h3 className={styles.title}>Graphs</h3>
              <p>
                Present all of the different categories togather. View and split
                the data as you wish to gather insights about your habbits.
              </p>
            </motion.div>
            <motion.div variants={sectionElementVars} className={styles.img}>
              <Image
                style={{ borderRadius: '0.25rem', objectFit: 'cover' }}
                alt='graph'
                src={graph}
              />
            </motion.div>
          </motion.div>
          <motion.div variants={startBlockVars} className={styles.block}>
            <motion.div variants={sectionElementVars} className={styles.text}>
              <h3 className={styles.title}>Useful Information</h3>
              <p>
                Heads-up notes will pop up with info about things worth paying
                attention to.
              </p>
            </motion.div>
            <motion.div variants={sectionElementVars} className={styles.img}>
              <Image
                style={{ borderRadius: '0.25rem', objectFit: 'cover' }}
                alt='useful information component'
                src={useful_info}
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Start;
