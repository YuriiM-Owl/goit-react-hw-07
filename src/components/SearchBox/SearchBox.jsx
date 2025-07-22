import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/contactsSlice";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();

  // return (
  //   <input
  //     className={css.input}
  //     type="text"
  //     placeholder="Search..."
  //     onChange={(e) => dispatch(setFilter(e.target.value))}
  //   />
  // );

  return (
    <div className={css.searchBox}>
      <label htmlFor="search">Find contacts by name</label>
      <input
        className={css.input}
        type="text"
        id="search"
        placeholder="Search..."
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
    </div>
  );
};

export default SearchBox;
