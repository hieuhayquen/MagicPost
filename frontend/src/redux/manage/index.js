import { createSlice } from "@reduxjs/toolkit";

export const manageSlice = createSlice({
	name: "manage",
	initialState: {
		currentOrder: null,
		currentStaff: null,
		currentTransaction: null,
		currentGather: null,
	},
	reducers: {
		setCurrentOrder: (state, action) => {
			state.currentOrder = action.payload;
		},
		setCurrentStaff: (state, action) => {
			state.currentStaff = action.payload;
		},
		setCurrentTransaction: (state, action) => {
			state.currentTransaction = action.payload;
		},
		setCurrentGather: (state, action) => {
			state.currentGather = action.payload;
		},
	},
});

export const { 
	setCurrentOrder,
	setCurrentTransaction,
	setCurrentGather,
} = manageSlice.actions;

export default manageSlice.reducer;
