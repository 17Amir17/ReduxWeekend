import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../ReduxManagement/store';

// Define a type for the slice state
interface UserState {
  fullName: string;
  workplace: string;
  date: Date;
  userSet?: boolean;
}

// Define the initial state using that type
const initialState = { userSet: false } as UserState;

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<UserState>) => {
      state.fullName = action.payload.fullName;
      state.date = action.payload.date;
      state.workplace = action.payload.workplace;
      state.userSet = true;
    },
    resetUser: (state) => {
      state.userSet = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
