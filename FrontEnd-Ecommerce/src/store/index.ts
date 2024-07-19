import { configureStore,combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cart from './cart/cartSlice';
import auth from './auth/authSlice';
import category from './categories/categorySlice';
import wishlist from './wishlist/wishlistSlice';
import orders from './orders/ordersSlice';
import products from './products/productsSlice';

const rootPersistConfig={
  key:"root",
  storage,
  whitelist:["cart","auth","wishlist"]
}

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user","accessToken"],
};
const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  whitelist: ["itemsId"],
};
const rootReducer = combineReducers({
  auth:persistReducer(authPersistConfig, auth),
  category,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist:persistReducer(wishlistPersistConfig, wishlist),
  orders,
});

const persistedReducer= persistReducer(rootPersistConfig,rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


const persistor = persistStore(store);

export { store, persistor };