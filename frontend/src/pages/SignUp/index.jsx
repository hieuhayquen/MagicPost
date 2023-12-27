import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import TextField from "../../component/Inputs/TextField";
import Checkbox from "../../component/Inputs/Checkbox";
import Button from "../../component/Button";

import styles from "./styles.module.scss";

const SignUp = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		name: "",
		role: "customer",
		phone: "",
		address: "",
		products: [],
		workAt: "",
	});
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);

	const navigate = useNavigate();

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors(() => ({ ...errors, [name]: value }));
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		name: Joi.string().required().label("Name"),
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			try {
				setIsFetching(true);
				const url = process.env.REACT_APP_API_URL + '/users';
				await axios.post(url, data);
				console.log(data);
				setIsFetching(false);
				toast.success("Account created successfully");
				navigate("/login");
			} catch (error) {
				console.log(data);
				setIsFetching(false);
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					toast.error(error.response.data);
				} else {
					console.log(error);
					toast.error("Something went wrong!");
				}
			}
		} else {
			console.log("Bạn chưa điền nội dung này");
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Đăng ký miễn phí để theo dõi đơn hàng của bạn</h1>
			<Button
				label="Đăng ký với Facebook"
				style={{ background: "#1877f2", color: "white" }}
			/>
			<p className={styles.or_container}>Hoặc</p>
			<form onSubmit={handleSubmit} className={styles.form_container}>
				<h2 className={styles.form_heading}>Đăng ký với tài khoản email</h2>
				<div className={styles.input_container}>
					<TextField
						label="Tên của bạn"
						placeholder="Họ và tên"
						name="name"
						handleInputState={handleInputState}
						schema={schema.name}
						handleErrorState={handleErrorState}
						value={data.name}
						error={errors.name}
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="Email"
						placeholder="Nhập email của bạn"
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
				<div className={styles.input_container}>
					<TextField
						label="Số điện thoại"
						placeholder="Số điện thoại"
						name="phone"
						handleInputState={handleInputState}
						schema={schema.phone}
						handleErrorState={handleErrorState}
						value={data.phone}
						error={errors.phone}
						type="phone"
						required={true}
					/>
				</div><div className={styles.input_container}>
					<TextField
						label="Địa chỉ"
						placeholder="Địa chỉ"
						name="address"
						handleInputState={handleInputState}
						schema={schema.address}
						handleErrorState={handleErrorState}
						value={data.address}
						error={errors.address}
						type="address"
						required={true}
					/>
				</div>
		
				<div className={styles.checkbox_container}>
					<Checkbox
						required={true}
						label="Tôi đồng ý với các điều khoản sử dụng"
					/>
				</div>
			
				<p className={styles.terms_condition}>
					Để tìm hiểu thêm về các chính sách {" "}
					<a href="/#">Điều khoản sử dụng.</a>
				</p>
				<div className={styles.submit_btn_wrapper}>
					<Button label="Đăng ký" type="submit" isFetching={isFetching} />
				</div>
				<p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
					Bạn đã có tài khoản? <Link to="/login"> Đăng nhập.</Link>
				</p>
			</form>
		</div>
	);
};

export default SignUp;
