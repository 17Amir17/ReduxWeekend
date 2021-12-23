import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from '../Reducers/equipmentReducer';
import userReducer from '../Reducers/userReducer';
// ...

const store = configureStore({
  reducer: {
    //name: reducer
    equipment: equipmentReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
