import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addUserEndpoint } from '../constants/endpoints';
import { status } from '../constants/helpers';

const initialState_user = {
    user: {
        info: [],
        status: 'idle',
        error: null,
    }
};

export const createUser = createAsyncThunk(
    'user/register',
    async (user) => {
        console.log(user);
        const resp = await axios.post(addUserEndpoint);
        return resp;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: initialState_user,
    reducers: {},
    extraReducers: {
      [createUser.pending]: (state, action) => {
        state.user.status = status.loading;
      },
      [createUser.fulfilled]: (state, { payload }) => {
        state.user.status = status.succeded;
        state.user.info = payload.data;
      },
      [createUser.rejected]: (state, action) => {
        state.user.status = status.failed;
        state.user.error = action.error;
      }
    }
});

    export default userSlice;