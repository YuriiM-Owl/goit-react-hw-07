import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik initialValues={{ name: "", number: "" }} onSubmit={handleSubmit}>
      <Form className={css.contactForm}>
        <div>
          <label>Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className={css.error} />
        </div>
        <div>
          <label>Phone</label>
          <Field type="text" name="number" />
          <ErrorMessage name="number" component="div" className={css.error} />
        </div>
        <button className={css.button} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
