import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
	name: "transactions",
	initialState: {
		transactions: [],
		createTransactionProgress: false,
		updateTransactionProgress: false,
		getAllTransactionsProgress: false,
		addProgress: false,
		removeProgress: false,
		deleteTransactionProgress: false,
		error: false,
	},
	reducers: {
		createTransactionStart: (state) => {
			state.createTransactionProgress = true;
		},
		createTransactionSuccess: (state, action) => {
			state.transactions.push(action.payload);
			state.createTransactionProgress = false;
		},
		createTransactionFailure: (state) => {
			state.error = true;
			state.createTransactionProgress = false;
		},

		getAllTransactionsStart: (state) => {
			state.getAllTransactionsProgress = true;
		},
		getAllTransactionsSuccess: (state, action) => {
			state.transactions = action.payload;
			state.getAllTransactionsProgress = false;
		},
		getAllTransactionsFailure: (state) => {
			state.error = true;
			state.getAllTransactionsProgress = false;
		},

		addStart: (state) => {
			state.addProgress = true;
		},
		addSuccess: (state, action) => {
			const index = state.transactions.indexOf(action.payload._id);
			state.transactions[index] = action.payload;
			state.addProgress = false;
		},
		addFailure: (state) => {
			state.error = true;
			state.addProgress = false;
		},
		removeStart: (state) => {
			state.removeProgress = true;
		},
		removeSuccess: (state, action) => {
			const index = state.transactions.indexOf(action.payload._id);
			state.transactions[index] = action.payload;
			state.removeProgress = false;
		},
		removeFailure: (state) => {
			state.error = true;
			state.removeProgress = false;
		},

		updateTransactionStart: (state) => {
			state.updateTransactionProgress = true;
		},
		updateTransactionSuccess: (state, action) => {
			const index = state.transactions.findIndex(
				(transaction) => transaction._id === action.payload._id
			);
			state.transactions[index] = action.payload;
			state.updateTransactionProgress = false;
		},
		updateTransactionFailure: (state) => {
			state.error = true;
			state.updateTransactionProgress = false;
		},

		deleteTransactionStart: (state) => {
			state.deleteTransactionProgress = true;
		},
		deleteTransactionSuccess: (state, action) => {
			state.transactions = state.transactions.filter(
				(transaction) => transaction._id !== action.payload
			);
			state.deleteTransactionProgress = false;
		},
		deleteTransactionFailure: (state) => {
			state.error = true;
			state.deleteTransactionProgress = false;
		},
	},
});

export const {
	createTransactionStart,
	createTransactionSuccess,
	createTransactionFailure,
	getAllTransactionsStart,
	getAllTransactionsSuccess,
	getAllTransactionsFailure,
	addStart,
	addSuccess,
	addFailure,
	removeStart,
	removeSuccess,
	removeFailure,
	deleteTransactionStart,
	deleteTransactionSuccess,
	deleteTransactionFailure,
	updateTransactionStart,
	updateTransactionSuccess,
	updateTransactionFailure,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
