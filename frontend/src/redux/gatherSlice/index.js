import { createSlice } from "@reduxjs/toolkit";

export const GatherSlice = createSlice({
	name: "gathers",
	initialState: {
		gathers: [],
		createGatherProgress: false,
		getGatherProgress: false,
		addOrderProgress: false,
		addStaffProgress: false,
		removeOrderProgress: false,
		removeStaffProgress: false,
		deleteGatherProgress: false,
		error: false,
	},
	reducers: {
		createGatherStart: (state) => {
			state.createGatherProgress = true;
		},
		createGatherSuccess: (state, action) => {
			state.gathers.push(action.payload);
			state.createGatherProgress = false;
		},
		createGatherFailure: (state) => {
			state.error = true;
			state.createTransactionProgress = false;
		},

		getGatherStart: (state) => {
			state.getGatherProgress = true;
		},
		getGatherSuccess: (state, action) => {
			state.gathers = action.payload;
			state.getGatherProgress = false;
		},
		getGatherFailure: (state) => {
			state.error = true;
			state.getGatherProgress = false;
		},
		
		addOrderStart: (state) => {
			state.addOrderProgress = true;
		},
		addOrderSuccess: (state, action) => {
			const index = state.gathers.indexOf(action.payload._id);
			state.gathers[index] = action.payload;
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
			const index = state.gathers.indexOf(action.payload._id);
			state.gathers[index] = action.payload;
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
			const index = state.gathers.indexOf(action.payload._id);
			state.gathers[index] = action.payload;
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
			const index = state.gathers.indexOf(action.payload._id);
			state.gathers[index] = action.payload;
			state.removeStaffProgress = false;
		},
		removeStaffFailure: (state) => {
			state.error = true;
			state.removeStaffProgress = false;
		},

		deleteGatherStart: (state) => {
			state.deleteGatherProgress = true;
		},
		deleteGatherSuccess: (state, action) => {
			state.gathers = state.gathers.filter(
				(gather) => gather._id !== action.payload
			);
			state.deleteGatherProgress = false;
		},
		deleteGatherFailure: (state) => {
			state.error = true;
			state.deleteGatherProgress = false;
		},
	},
});

export const {
	createGatherStart,
	createGatherSuccess,
	createGatherFailure,
	getGatherStart,
	getGatherSuccess,
	getGatherFailure,
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
	deleteGatherStart,
	deleteGatherSuccess,
	deleteGatherFailure,
} = GatherSlice.actions;

export default GatherSlice.reducer;
