import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRandomUsers } from '../api/randomUser';

// Load API
export const loadContacts = createAsyncThunk('contacts/load', async () => {
  return await fetchRandomUsers();
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadContacts.pending, state => { state.status = 'loading'; })
      .addCase(loadContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loadContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;
