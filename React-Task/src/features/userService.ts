import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  total_pages: number;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  total_pages: 1,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (page: number) => {
  const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, ...action.payload.data];
        state.total_pages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});


export default userSlice.reducer;
