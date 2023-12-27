import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/users";

export const createUser = async (user, dispatch) => {
	dispatch(actions.createUserStart());
	try {
		const { data } = await axiosInstance.post("/users", user);
		dispatch(actions.createUserSuccess(data.data));
		console.log(data);
		toast.success(data.message);
		return data.data;
	} catch (error) {
		dispatch(actions.createUserFailure());
		console.log(user);
		console.log(error);
		return false;
	}
};

export const getUser = async (payload, dispatch) => {
	dispatch(actions.getUserStart());
	try {
		const { data } = await axiosInstance.get(`/users/${payload}`);
		dispatch(actions.getUserSuccess(data.data.user));
		return true;
	} catch (error) {
		dispatch(actions.getUserFailure());
		return false;
	}
};

export const getAllUsers = async (dispatch) => {
	dispatch(actions.getUsersStart());
	try {
		const { data } = await axiosInstance.get("/users");
		dispatch(actions.getUsersSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getUsersFailure());
		return false;
	}
};

export const updateUser = async (id, user, dispatch) => {
	dispatch(actions.updateUserStart());
	try {
		const { data } = await axiosInstance.put(`/users/${id}`, user);
		dispatch(actions.updateUserSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateUserFailure());
		return false;
	}
};

export const addProductToUser = async (payload, dispatch) => {
	dispatch(actions.addStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/add/product", payload);
		dispatch(actions.addSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.addFailure());
		return false;
	}
};

export const deleteUser = async (id, dispatch) => {
	dispatch(actions.deleteUserStart());
	try {
		const { data } = await axiosInstance.delete(`/users/${id}`);
		dispatch(actions.deleteUserSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteUserFailure());
		return false;
	}
};
