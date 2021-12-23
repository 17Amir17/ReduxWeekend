import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import equipmentReducer from '../Reducers/equipmentReducer';
import userReducer from '../Reducers/userReducer';
// ...

const middleware: Middleware[] = [];

const logger: Middleware = (store) => (next) => (action) => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

if (process.env.NODE_ENV !== 'PRODUCTION') {
  middleware.push(logger);
}

const store = configureStore({
  reducer: {
    //name: reducer
    equipment: equipmentReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
