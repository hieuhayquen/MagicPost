import { createSlice } from "@reduxjs/toolkit";

export const gathersSlice = createSlice({
	name: "gathers",
	initialState: {
		gathers: [],
		createGatherProgress: false,
		updateGatherProgress: false,
		getGatherProgress: false,
		addProgress: false,
		removeProgress: false,
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
			state.createGatherProgress = false;
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
		
		addStart: (state) => {
			state.addProgress = true;
		},
		addSuccess: (state, action) => {
			const index = state.gathers.indexOf(action.payload._id);
			state.gathers[index] = action.payload;
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
			const index = state.gathers.indexOf(action.payload._id);
			state.gathers[index] = action.payload;
			state.removeProgress = false;
		},
		removeFailure: (state) => {
			state.error = true;
			state.removeProgress = false;
		},

		updateGatherStart: (state) => {
			state.updateGatherProgress = true;
		},
		updateGatherSuccess: (state, action) => {
			const index = state.gathers.findIndex(
				(gather) => gather._id === action.payload._id
			);
			state.gathers[index] = action.payload;
			state.updateGatherProgress = false;
		},
		updateGatherFailure: (state) => {
			state.error = true;
			state.updateGatherProgress = false;
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
	addStart,
	addSuccess,
	addFailure,
	removeStart,
	removeSuccess,
	removeFailure,
	deleteGatherStart,
	deleteGatherSuccess,
	deleteGatherFailure,
	updateGatherStart,
	updateGatherSuccess,
	updateGatherFailure,
} = gathersSlice.actions;

export default gathersSlice.reducer;
