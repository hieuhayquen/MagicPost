import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
	name: "orders",
	initialState: {
		orders: [],
		createOrderProgress: false,
		getAllOrdersProgress: false,
		updateOrderProgress: false,
		deleteOrderProgress: false,
		error: false,
	},
	reducers: {
		createOrderStart: (state) => {
			state.createOrderProgress = true;
		},
		createOrderSuccess: (state, action) => {
			state.orders.push(action.payload);
			state.createOrderProgress = false;
		},
		createOrderFailure: (state) => {
			state.error = true;
			state.createOrderProgress = false;
		},

		getAllOrdersStart: (state) => {
			state.getAllOrdersProgress = true;
		},
		getAllOrdersSuccess: (state, action) => {
			state.orders = action.payload;
			state.getAllOrdersProgress = false;
		},
		getAllOrdersFailure: (state) => {
			state.error = true;
			state.getAllOrdersProgress = false;
		},

		updateOrderStart: (state) => {
			state.updateOrderProgress = true;
		},
		updateOrderSuccess: (state, action) => {
			const index = state.orders.findIndex(
				(order) => order._id === action.payload._id
			);
			state.orders[index] = action.payload;
			state.updateOrderProgress = false;
		},
		updateOrderFailure: (state) => {
			state.error = true;
			state.updateOrderProgress = false;
		},

		deleteOrderStart: (state) => {
			state.deleteOrderProgress = true;
		},
		deleteOrderSuccess: (state, action) => {
			state.orders = state.orders.filter((order) => order._id !== action.payload);
			state.deleteOrderProgress = false;
		},
		deleteOrderFailure: (state) => {
			state.error = true;
			state.deleteOrderProgress = false;
		},
	},
});

export const {
	createOrderStart,
	createOrderSuccess,
	createOrderFailure,
	getAllOrdersStart,
	getAllOrdersSuccess,
	getAllOrdersFailure,
	updateOrderStart,
	updateOrderSuccess,
	updateOrderFailure,
	deleteOrderStart,
	deleteOrderSuccess,
	deleteOrderFailure,
} = ordersSlice.actions;

export default ordersSlice.reducer;
