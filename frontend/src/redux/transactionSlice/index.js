import { createSlice } from "@reduxjs/toolkit";

export const TransactionSlice = createSlice({
	name: "transactions",
	initialState: {
		transactions: [],
		currentTransaction: null,
		createTransactionProgress: false,
		getAllTransactionsProgress: false,
		getTransactionProgress: false,
		addOrderProgress: false,
		addStaffProgress: false,
		removeOrderProgress: false,
		removeStaffProgress: false,
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
		
		addOrderStart: (state) => {
			state.addOrderProgress = true;
		},
		addOrderSuccess: (state, action) => {
			const index = state.transactions.indexOf(action.payload._id);
			state.transactions[index] = action.payload;
			state.addOrderProgress = false;
		},
		addOrderFailure: (state) => {
			state.error = true;
			state.addOrderProgress = false;
		},

		addStaffStart: (state) => {
			state.addStaffProgress = true;
		},
		addStaffSuccess: (state, action) => {
			const index = state.transactions.indexOf(action.payload._id);
			state.transactions[index] = action.payload;
			state.addStaffProgress = false;
		},
		addStaffFailure: (state) => {
			state.error = true;
			state.addStaffProgress = false;
		},

		removeOrderStart: (state) => {
			state.removeOrderProgress = true;
		},
		removeOrderSuccess: (state, action) => {
			const index = state.transactions.indexOf(action.payload._id);
			state.transactions[index] = action.payload;
			state.removeOrderProgress = false;
		},
		removeOrderFailure: (state) => {
			state.error = true;
			state.removeOrderProgress = false;
		},

		removeStaffStart: (state) => {
			state.removeStaffProgress = true;
		},
		removeStaffSuccess: (state, action) => {
			const index = state.transactions.indexOf(action.payload._id);
			state.transactions[index] = action.payload;
			state.removeStaffProgress = false;
		},
		removeStaffFailure: (state) => {
			state.error = true;
			state.removeStaffProgress = false;
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

		getTransactionStart: (state) => {
			state.getTransactionProgress = true;
		},
		getTransactionSuccess: (state, action) => {
			state.currentTransaction = action.payload;
			state.getTransactionProgress = false;
		},
		getTransactionFailure: (state) => {
			state.getTransactionProgress = false;
			state.error = true;
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
	getTransactionStart,
	getTransactionSuccess,
	getTransactionFailure,
	addOrderStart,
	addOrderSuccess,
	addOrderFailure,
	addStaffStart,
	addStaffSuccess,
	addStaffFailure,
	removeOrderStart,
	removeOrderSuccess,
	removeOrderFailure,
	removeStaffFailure,
	removeStaffStart,
	removeStaffSuccess,
	deleteTransactionStart,
	deleteTransactionSuccess,
	deleteTransactionFailure,
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
