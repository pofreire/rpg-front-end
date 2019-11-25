import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistentReducer = persistReducer(
    {
      key: 'D&D',
      storage,
      whitelist: ['user'],
    },
    reducers
  );

  return persistentReducer;
};
