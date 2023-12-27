import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/transactions";

export const createTransaction = async (payload, dispatch) => {
	dispatch(actions.createTransactionStart());
	try {
		const { data } = await axiosInstance.post(apiUrl, payload);
		dispatch(actions.createTransactionSuccess(data.data));
		return data.data;
	} catch (error) {
		dispatch(actions.createTransactionFailure());
		return false;
	}
};

export const addOrderToTransaction = async (payload, dispatch) => {
	dispatch(actions.addStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/add-order", payload);
		dispatch(actions.addSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.addFailure());
		return false;
	}
};

export const addStaffToTransaction = async (payload, dispatch) => {
	dispatch(actions.addStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/add-staff", payload);
		dispatch(actions.addSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.addFailure());
		return false;
	}
};

export const addProductToTransaction = async (payload, dispatch) => {
	dispatch(actions.addStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/add-product", payload);
		dispatch(actions.addSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.addFailure());
		return false;
	}
};

export const removeOrderFromTransaction = async (payload, dispatch) => {
	dispatch(actions.removeStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/remove/order", payload);
		dispatch(actions.removeSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.removeFailure());
		return false;
	}
};

export const removeStaffFromTransaction = async (payload, dispatch) => {
	dispatch(actions.removeStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/remove/staff", payload);
		dispatch(actions.removeSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.removeFailure());
		return false;
	}
};

export const removeProductFromTransaction = async (payload, dispatch) => {
	dispatch(actions.removeStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/remove/product", payload);
		dispatch(actions.removeSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.removeFailure());
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

export const updateTransaction = async (id, transaction, dispatch) => {
	dispatch(actions.updateTransactionStart());
	try {
		const { data } = await axiosInstance.put(`/transactions/${id}`, transaction);
		dispatch(actions.updateTransactionSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateTransactionFailure());
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


