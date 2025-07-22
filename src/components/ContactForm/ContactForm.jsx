import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
// Імпортуємо екшен
import { addContact } from "../../redux/contactsSlice";
// Імпортуємо селектор
import { selectContacts } from "../../redux/contactsSlice";
import css from "./ContactForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  number: Yup.string()
    .required("Number is required")
    .matches(
      /^\d[\d-]*\d$/,
      "Number must contain only digits and dashes, and start/end with a digit"
    )
    .min(3, "Number must be at least 3 characters")
    .max(50, "Number must be at most 50 characters"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  // Отримуємо поточні контакти з Redux
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    // Перевірка на дублювання контактів
    const duplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (duplicate) {
      alert(`${values.name} is already in contacts!`);
      return;
    }

    // Відправка екшену для додавання контакту
    dispatch(addContact({ id: Date.now().toString(), ...values }));
    // Скидаємо форму після успішного сабміту
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={css.contactForm}>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" placeholder="Enter name" />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>
          <div>
            <label htmlFor="number">Number</label>
            <Field
              type="text"
              id="number"
              name="number"
              placeholder="Enter phone number"
            />
            <ErrorMessage name="number" component="div" className={css.error} />
          </div>
          <button type="submit">Add Contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
