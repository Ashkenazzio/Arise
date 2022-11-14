//    ANIMATIONS    //
/////////////////////

const containerAppearsUp = {
  hidden: {
    opacity: 0,
    y: '5rem',
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: 'beforeChildren',
      ease: 'easeInOut',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { when: 'afterChildren' },
  },
};

const containerAppearsLeft = {
  hidden: {
    opacity: 0,
    x: '5rem',
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      when: 'beforeChildren',
      ease: 'easeInOut',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { when: 'afterChildren' },
  },
};

const elementAppearsUp = {
  hidden: {
    opacity: 0,
    y: '2rem',
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: { when: 'afterChildren' },
  },
};

const elementAppearsLeft = {
  hidden: {
    opacity: 0,
    x: '2rem',
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: { when: 'afterChildren' },
  },
};

const elementAppearsRight = {
  hidden: {
    opacity: 0,
    x: '-2rem',
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: { when: 'afterChildren' },
  },
};

const staggerContainers = {
  enter: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const staggerElements = {
  enter: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

//      VARS        //
/////////////////////

export const mainContainerVars = {};

//PAGES

export const flowPageVars = staggerContainers;

export const summaryPageVars = staggerContainers;

//START

export const startContainerVars = containerAppearsUp;

export const startSectionVars = staggerElements;

export const startBlockVars = staggerElements;

export const sectionElementVars = elementAppearsUp;

//ADD

export const entryFormVars = containerAppearsUp;

export const formFieldVars = elementAppearsUp;

//FLOW

export const flowListVars = containerAppearsUp;

export const blockContainerVars = elementAppearsUp;

export const blockListVars = staggerElements;

export const flowItemVars = elementAppearsUp;

export const flowFormVars = staggerElements;

//BALANCE

export const balanceContainerVars = {
  hidden: {
    opacity: 0,
    y: '-5rem',
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: 'beforeChildren',
      ease: 'easeInOut',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { when: 'afterChildren' },
  },
};

export const balanceVars = elementAppearsUp;

// INFO

export const infoContainerVars = containerAppearsUp;

export const infoRailVars = staggerElements;

export const noteVars = elementAppearsUp;

//GRAPH

export const graphContainerVars = containerAppearsUp;

export const chartContainerVars = containerAppearsUp;

export const railLeftArrowVars = elementAppearsLeft;

export const railRightArrowVars = elementAppearsRight;

//SUM-RAIL

export const railContainerVars = containerAppearsLeft;

export const sumRailVars = staggerElements;

export const sumCardVars = elementAppearsLeft;

export const shadowBottomVars = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

//MODAL

export const backdropVars = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { when: 'afterChildren' },
  },
};

export const modalVars = {
  hidden: {
    opacity: 0,
    y: '5vw',
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    y: '-100vh',
    transition: { ease: 'easeInOut' },
  },
};

//SETTINGS

export const settingsVars = containerAppearsUp;

// PROFILE

export const profileVars = containerAppearsUp;

//LOGIN

export const loginVars = containerAppearsUp;
//REGISTER

export const registerVars = containerAppearsUp;
