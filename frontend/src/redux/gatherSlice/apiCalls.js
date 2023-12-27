import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/gathers";

export const createGather = async (payload, dispatch) => {
	dispatch(actions.createGatherStart());
	try {
		const { data } = await axiosInstance.post(apiUrl, payload);
		dispatch(actions.createGatherSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.createGatherFailure());
		return false;
	}
};

export const addOrderToGather = async (payload, dispatch) => {
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

export const addStaffToGather = async (payload, dispatch) => {
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

export const addProductToGather = async (payload, dispatch) => {
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

export const addTransactionToGather = async (payload, dispatch) => {
	dispatch(actions.addStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/add-transaction", payload);
		dispatch(actions.addSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.addFailure());
		return false;
	}
};

export const removeOrderFromGather = async (payload, dispatch) => {
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

export const removeStaffFromGather = async (payload, dispatch) => {
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

export const removeProductFromGather = async (payload, dispatch) => {
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

export const removeTransactionFromGather = async (payload, dispatch) => {
	dispatch(actions.removeStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + "/remove-transaction", payload);
		dispatch(actions.removeSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.removeFailure());
		return false;
	}
};

export const getAllGathers = async (dispatch) => {
	dispatch(actions.getGatherStart());
	try {
		const { data } = await axiosInstance.get(apiUrl + "/");
		dispatch(actions.getGatherSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getGatherFailure());
		return false;
	}
};

export const updateGather = async (id, gather, dispatch) => {
	dispatch(actions.updateGatherStart());
	try {
		const { data } = await axiosInstance.put(`/gathers/${id}`, gather);
		dispatch(actions.updateGatherSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateGatherFailure());
		return false;
	}
};

export const deleteGather = async (id, dispatch) => {
	dispatch(actions.deleteGatherStart());
	try {
		const { data } = await axiosInstance.delete(apiUrl + "/" + id);
		dispatch(actions.deleteGatherSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteGatherFailure());
		return false;
	}
};


