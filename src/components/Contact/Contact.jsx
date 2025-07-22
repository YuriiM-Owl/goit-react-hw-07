import PropTypes from "prop-types";
import css from "./Contact.module.css";

const Contact = ({ name, number, onDelete }) => {
  return (
    <li className={css.item}>
      <p>
        {name}: {number}
      </p>
      <button type="button" className={css.button} onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contact;
