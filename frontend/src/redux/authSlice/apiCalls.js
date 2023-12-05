import axios from "axios";
import { jwtDecode }  from "jwt-decode";
import { toast } from "react-toastify";
import { loginStart, loginSuccess, loginFailure } from "./index";

const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (user, dispatch) => {
	dispatch(loginStart());
	try {
		const url = apiUrl + '/login';
		const { data } = await axios.post(url, user);

		const decodeData = jwtDecode(data.data);
		//console.log(data);
		toast.success(data.message);
		dispatch(loginSuccess({ ...decodeData, token: data.data }));
		window.location = "/";
	} catch (error) {
		dispatch(loginFailure());
		if (error.response && error.response.status >= 400 && error.response.status < 500) {
			toast.error(error.response.data.message);
		} else {
			console.log(error);
			toast.error("Something went wrong!");
		};
	}
};
