import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import transactionsReducer from "./transactionSlice";
import gathersReducer from "./gatherSlice";

const reducers = combineReducers({
	auth: authReducer,
	users: usersReducer,
	transactions: transactionsReducer,
	gathers: gathersReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth", ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
