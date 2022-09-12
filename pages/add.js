import EntryForm from '@/entries/EntryForm';

const AddEntry = () => {
  const addItemHandler = (queryData, enteredList) => {
    let queryList;

    if (enteredList === 'expense') {
      queryList = 'expenses';
    }

    if (enteredList === 'income') {
      queryList = 'incomes';
    }

    let url = `https://arise-f6abb-default-rtdb.europe-west1.firebasedatabase.app/${queryList}.json`;

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
