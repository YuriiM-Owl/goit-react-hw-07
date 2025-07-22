import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    filter: "",
    loading: false,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter } = contactsSlice.actions;

// Селектори
export const selectContactsItems = (state) => state.contacts.items;
export const selectContactsLoading = (state) => state.contacts.loading;
export const selectContactsError = (state) => state.contacts.error;

// Мемоізований селектор для фільтрації контактів
export const selectFilteredContacts = createSelector(
  [selectContactsItems, (state) => state.contacts.filter],
  (items, filter) =>
    items.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);

export default contactsSlice.reducer;
