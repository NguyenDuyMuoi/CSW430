import 'react-native-get-random-values';
import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    favorites: favoritesReducer,
  },
});

export const selectContacts = state => state.contacts.items;
export const selectStatus = state => state.contacts.status;
export const selectFavoriteIds = state => state.favorites.ids;
