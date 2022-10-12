import EntryForm from 'components/add/EntryForm';
import { useAuthUser } from 'context/AuthContext';
import { useLayoutEffect } from 'react';

const AddEntry = (props) => {
  const [authUser] = useAuthUser();

  const addItemHandler = (queryData, queryList) => {
    if (!authUser) {
      const currentLocalJSON = localStorage.getItem(queryList);
      if (!currentLocalJSON) {
        localStorage.setItem(
          queryList,
          JSON.stringify([{ id: Date.now(), ...queryData }])
        );
        return;
      }
      const parsedJSON = JSON.parse(currentLocalJSON);

      parsedJSON.push({ id: Date.now(), ...queryData });
      localStorage.setItem(queryList, JSON.stringify(parsedJSON));
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

  useLayoutEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Entries');
    setFilter(false);
  }, []);

  return <EntryForm onAddItem={addItemHandler} />;
};

export default AddEntry;
