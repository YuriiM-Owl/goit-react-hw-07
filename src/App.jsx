import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import {
  selectContactsLoading,
  selectContactsError,
} from "./redux/contactsSlice";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="containerApp">
      <h1>Phonebook</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
