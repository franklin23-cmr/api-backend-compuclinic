import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './authStore/reducer';
import { userReducer } from './userStore/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer', 'authReducer'], //which reducer you want to persist
};

const rootReducer = combineReducers({
  userReducer: userReducer,
  authReducer: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
