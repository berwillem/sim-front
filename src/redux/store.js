import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/authSlice";
import CartReducer from "./slices/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "sym",
  storage,
  whitelist: ["cart", "auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: AuthReducer,
    cart: CartReducer, // Ajout du reducer du panier
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredActionPaths: ["register"],
        ignoredPaths: ["auth.user.someNonSerializablePath"],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);
