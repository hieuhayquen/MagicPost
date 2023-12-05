import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/transactions";

export const createTransaction = async (payload, dispatch) => {
	dispatch(actions.createTransactionStart());
	try {
		const { data } = await axiosInstance.post(apiUrl, payload);
		dispatch(actions.createTransactionSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.createTransactionFailure());
		return false;
	}
};

export const getTransaction = async (payload, dispatch) => {
	dispatch(actions.getTransactionStart());
	try {
		const { data } = await axiosInstance.get(apiUrl +`/${payload}`);
		dispatch(actions.getTransactionSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getTransactionFailure());
		return false;
	}
};

export const addOrderToTransaction = async (payload, dispatch) => {
	dispatch(actions.addOrderStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/add-order", payload);
		dispatch(actions.addOrderSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.addOrderFailure());
		return false;
	}
};

export const addStaffToTransaction = async (payload, dispatch) => {
	dispatch(actions.addStaffStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/add-staff", payload);
		dispatch(actions.addStaffSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.addStaffFailure());
		return false;
	}
};

export const removeOrderFromTransaction = async (payload, dispatch) => {
	dispatch(actions.removeOrderStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/remove-order", payload);
		dispatch(actions.removeOrderSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.removeOrderFailure());
		return false;
	}
};

export const removeStaffFromTransaction = async (payload, dispatch) => {
	dispatch(actions.removeStaffStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/remove-staff", payload);
		dispatch(actions.removeStaffSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.removeStaffFailure());
		return false;
	}
};

export const getAllTransactions = async (dispatch) => {
	dispatch(actions.getAllTransactionsStart());
	try {
		const { data } = await axiosInstance.get(apiUrl + "/");
		dispatch(actions.getAllTransactionsSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllTransactionsFailure());
		return false;
	}
};

export const deleteTransaction = async (id, dispatch) => {
	dispatch(actions.deleteTransactionStart());
	try {
		const { data } = await axiosInstance.delete(apiUrl + "/" + id);
		dispatch(actions.deleteTransactionSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteTransactionFailure());
		return false;
	}
};


