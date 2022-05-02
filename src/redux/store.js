import { configureStore } from '@reduxjs/toolkit';
import { slice } from './contacts-slice';

const store = configureStore({
  reducer: slice.reducer,
});

export default store;
