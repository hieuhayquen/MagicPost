import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

export const createProduct = async (product, dispatch) => {
	dispatch(actions.createProductStart());
	try {
		const { data } = await axiosInstance.post("/products", product);
		dispatch(actions.createProductSuccess(data.data));
		toast.success(data.message);
		return data.data;
	} catch (error) {
		dispatch(actions.createProductFailure());
		return false;
	}
};

export const getAllProducts = async (dispatch) => {
	dispatch(actions.getAllProductStart());
	try {
		const { data } = await axiosInstance.get("/products");
		dispatch(actions.getAllProductSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllProductFailure());
		return false;
	}
};

export const updateProduct = async (id, product, dispatch) => {
	dispatch(actions.updateProductStart());
	try {
		const { data } = await axiosInstance.put(`/products/${id}`, product);
		dispatch(actions.updateProductSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateProductFailure());
		return false;
	}
};

export const deleteProduct = async (id, dispatch) => {
	dispatch(actions.deleteProductStart());
	try {
		const { data } = await axiosInstance.delete(`/products/${id}`);
		dispatch(actions.deleteProductSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteProductFailure());
		return false;
	}
};
