import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		currentUser: null, //nguoi dang dang nhap 
		getUsersProgress: false,
		getUserProgress: false,
		addProgress: false,
		createUserProgress: false,
		updateUserProgress: false,
		deleteUserProgress: false,
		error: false,
	},
	reducers: {
		getUsersStart: (state) => {
			state.isFetching = true;
		},
		getUsersSuccess: (state, action) => {
			state.users = action.payload;
			state.isFetching = false;
		},
		getUsersFailure: (state) => {
			state.error = true;
			state.isFetching = false;
		},

		createUserStart: (state) => {
			state.isFetching = true;
		},
		createUserSuccess: (state, action) => {
			state.users.push(action.payload);
			state.isFetching = false;
		},
		createUserFailure: (state) => {
			state.error = true;
			state.isFetching = false;
		},

		updateUserStart: (state) => {
			state.isFetching = true;
		},
		updateUserSuccess: (state, action) => {
			const index = state.users.findIndex(
				(user) => user._id === action.payload._id
			);
			state.users[index] = action.payload;
			state.isFetching = false;
		},
		updateUserFailure: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		getUserStart: (state) => {
			state.getUserProgress = true;
		},
		getUserSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.getUserProgress = false;
		},
		getUserFailure: (state) => {
			state.getUserProgress = false;
			state.error = true;
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

		deleteUserStart: (state) => {
			state.isFetching = true;
		},
		deleteUserSuccess: (state, action) => {
			state.users = state.users.filter((user) => user._id !== action.payload);
			state.isFetching = false;
		},
		deleteUserFailure: (state) => {
			state.error = true;
			state.isFetching = false;
		},
	},
});

export const {
	createUserStart,
	createUserSuccess,
	createUserFailure,
	getUsersStart,
	getUsersSuccess,
	getUsersFailure,
	addStart,
	addSuccess,
	addFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	getUserStart,
	getUserSuccess,
	getUserFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
