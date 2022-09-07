import EntryForm from '@/entries/EntryForm';

const AddEntry = () => {
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

  return <EntryForm onAddItem={addItemHandler} />;
};

export default AddEntry;
