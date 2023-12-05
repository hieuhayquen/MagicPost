import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice/apiCalls";
import Joi from "joi";
import TextField from "../../component/Inputs/TextField";
import Checkbox from "../../component/Inputs/Checkbox";
import Button from "../../component/Button";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "./styles.module.scss";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({});
	const { isFetching } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleInputState = (name, value) => {
		setData({ ...data, [name]: value });
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors({ ...errors, [name]: value });
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: Joi.string().required().label("Password"),
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			login(data, dispatch);
		} else {
			console.log("Bạn chưa điền nội dung này");
		}
	};

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<button
					className={styles.contained_btn}
					style={{ background: "#3b5998" }}
				>
					<FacebookRoundedIcon /> đăng nhập với facebook
				</button>
				<button className={styles.outline_btn}>
					<GoogleIcon /> đăng nhập với google
				</button>
				<p className={styles.or_container}>Hoặc</p>
				<form onSubmit={handleSubmit} className={styles.form_container}>
					<div className={styles.input_container}>
						<TextField
							label="Email của bạn"
							placeholder="Email"
							name="email"
							handleInputState={handleInputState}
							schema={schema.email}
							handleErrorState={handleErrorState}
							value={data.email}
							error={errors.email}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							label="Mật khẩu"
							placeholder="Mật khẩu"
							name="password"
							handleInputState={handleInputState}
							schema={schema.password}
							handleErrorState={handleErrorState}
							value={data.password}
							error={errors.password}
							type="password"
							required={true}
						/>
					</div>
					<div className={styles.form_bottom}>
						<Checkbox label="Remember me" />
						<Button
							type="submit"
							label="LOG IN"
							isFetching={isFetching}
							style={{ color: "white", background: "#15883e", width: "20rem" }}
						/>
					</div>
				</form>
				<h1 className={styles.dont_have_account}>Bạn không có tài khoản?</h1>
				<Link to="/signup">
					<button className={styles.outline_btn}>Đăng ký</button>
				</Link>
			</main>
		</div>
	);
};

export default Login;
