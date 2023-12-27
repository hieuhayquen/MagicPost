import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		createProductProgress: false,
		getAllProductProgress: false,
		updateProductProgress: false,
		deleteProductProgress: false,
		error: false,
	},
	reducers: {
		createProductStart: (state) => {
			state.createProductProgress = true;
		},
		createProductSuccess: (state, action) => {
			state.products.push(action.payload);
			state.createProductProgress = false;
		},
		createProductFailure: (state) => {
			state.error = true;
			state.createProductProgress = false;
		},

		getAllProductStart: (state) => {
			state.getAllOrdersProgress = true;
		},
		getAllProductSuccess: (state, action) => {
			state.products = action.payload;
			state.getAllProductProgress = false;
		},
		getAllProductFailure: (state) => {
			state.error = true;
			state.getAllProductProgress = false;
		},

		updateProductStart: (state) => {
			state.updateProductProgress = true;
		},
		updateProductSuccess: (state, action) => {
			const index = state.products.findIndex(
				(product) => product._id === action.payload._id
			);
			state.products[index] = action.payload;
			state.updateProductProgress = false;
		},
		updateProductFailure: (state) => {
			state.error = true;
			state.updateProductProgress = false;
		},

		deleteProductStart: (state) => {
			state.deleteProductProgress = true;
		},
		deleteProductSuccess: (state, action) => {
			state.products = state.products.filter((product) => product._id !== action.payload);
			state.deleteProductProgress = false;
		},
		deleteProductFailure: (state) => {
			state.error = true;
			state.deleteProductProgress = false;
		},
	},
});

export const {
	createProductStart,
    createProductSuccess,
    createProductFailure,
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
