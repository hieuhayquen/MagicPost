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

export const addStaffToGather = async (payload, dispatch) => {
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

export const removeOrderFromGather = async (payload, dispatch) => {
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

export const removeStaffFromGather = async (payload, dispatch) => {
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

export const getAllGathers = async (dispatch) => {
	dispatch(actions.getGatherStart());
	try {
		const { data } = await axiosInstance.get(apiUrl + "/all");
		dispatch(actions.getGatherSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getGatherFailure());
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


