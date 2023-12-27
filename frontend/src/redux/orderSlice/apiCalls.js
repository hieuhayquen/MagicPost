import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

export const createOrder = async (order, dispatch) => {
	dispatch(actions.createOrderStart());
	try {
		const { data } = await axiosInstance.post("/orders", order);
		dispatch(actions.createOrderSuccess(data.data));
		toast.success(data.message);
		return data.data;
	} catch (error) {
		dispatch(actions.createOrderFailure());
		return false;
	}
};

export const getAllOrders = async (dispatch) => {
	dispatch(actions.getAllOrdersStart());
	try {
		const { data } = await axiosInstance.get("/orders");
		dispatch(actions.getAllOrdersSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllOrdersFailure());
		return false;
	}
};

export const updateOrder = async (id, order, dispatch) => {
	dispatch(actions.updateOrderStart());
	try {
		const { data } = await axiosInstance.put(`/orders/${id}`, order);
		dispatch(actions.updateOrderSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateOrderFailure());
		return false;
	}
};

export const deleteOrder = async (id, dispatch) => {
	dispatch(actions.deleteOrderStart());
	try {
		const { data } = await axiosInstance.delete(`/orders/${id}`);
		dispatch(actions.deleteOrderSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteOrderFailure());
		return false;
	}
};
