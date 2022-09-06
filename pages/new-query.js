const { default: QueryForm } = require('@/queries/QueryForm');

const NewQuery = () => {
  const addItemHandler = (queryData) => {
    let type;

    if (queryData.type === 'expense') {
      type = 'expenses';
    }

    if (queryData.type === 'income') {
      type = 'incomes';
    }

    let url = `https://arise-f6abb-default-rtdb.europe-west1.firebasedatabase.app/${type}.json`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(queryData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return <QueryForm onAddItem={addItemHandler} />;
};

export default NewQuery;
