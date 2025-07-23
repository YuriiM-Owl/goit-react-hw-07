import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import css from './Contact.module.css';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={css.item}>
      <p>
        {name}: {number}
      </p>
      <button type="button" className={css.button} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
