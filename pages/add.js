import EntryForm from '@/entries/EntryForm';
import { useLayout } from 'context/LayoutContext';
import { useSession } from 'context/SessionContext';

const AddEntry = () => {
  const [localSession] = useSession();

  const addItemHandler = (queryData, queryList) => {
    if (localSession) {
      const currentLocalJson = localStorage.getItem(queryList);

      localStorage.setItem(
        queryList,
        currentLocalJson + JSON.stringify(queryData)
      );
      return;
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

  const [title, setTitle, sort, setSort] = useLayout();
  setTitle('Entries');
  setSort(false);

  return <EntryForm onAddItem={addItemHandler} />;
};

export default AddEntry;
