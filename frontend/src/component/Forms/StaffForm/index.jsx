import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, updateUser } from "../../../redux/usersSlice/apiCalls";
import { addStaffToTransaction } from "../../../redux/transactionSlice/apiCalls";
import { addStaffToGather } from "../../../redux/gatherSlice/apiCalls";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import Button from "../../Button";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import styles from "./styles.module.scss";

const role = [
	{ name: "Quản lí điểm giao dịch", _id: "transactionAdmin" },
	{ name: "Quản lí điểm tập kết", _id: "gatherAdmin" },
];

const StaffForm = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [data, setData] = useState({
		email: "",
		password: "",
		name: "",
		role: "",
		address: "",
		phone: "",
		products: [],
		workAt: "",
	});
	const { users, createUserProgress, updateUserProgress } = useSelector(
		(state) => state.users
	);

	const [errors, setErrors] = useState({});
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	if (currentUser.role === 'gatherAdmin') {
		data.role = 'gatherStaff';
		data.workAt = currentUser.workAt;
	}
	if (currentUser.role === 'transactionAdmin') {
		data.role = 'transactionStaff';
		data.workAt = currentUser.workAt;
	}

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors((errors) => ({ ...errors, [name]: value }));
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required(),
		password: passwordComplexity().required(),
		name: Joi.string().min(0).max(20).required(),
	};

	useEffect(() => {
		if (id !== "new" && users) {
			const user = users.filter((user) => user._id === id);
			setData({
				email: user[0].email,
				name: user[0].name,
				address: user[0].address,
				phone: user[0].phone,
			});
		}
	}, [id, users]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			// thêm nhân viên ở điểm giao dịch
			if (currentUser.role === 'transactionAdmin'){ 
				if (id !== "new") {
					const res = await updateUser(id, data, dispatch);
					res && navigate("/transaction/staffs");
				} else {
					const res = await createUser(data, dispatch);
					const payload = {
						transactionId: data.workAt,
						staffId: res._id,
					}
					if (res) addStaffToTransaction(payload, dispatch);
					res && navigate("/transaction/staffs") ;
				};
			} else if (currentUser.role === 'gatherAdmin'){
				if (id !== "new") {
					const res = await updateUser(id, data, dispatch);
					res && navigate("/gather/staffs");
				} else {
					const res = await createUser(data, dispatch);
					console.log(res);
					const payload = {
						gatherId: data.workAt,
						staffId: res._id,
					}
					console.log(payload);
					if (res) addStaffToGather(payload, dispatch);
					
					res && navigate("/gather/staffs") ;
				};
			} else if (currentUser.role === 'companyAdmin'){
				if (id !== "new") {
					const res = await updateUser(id, data, dispatch);
					res && data.role === 'transactionAdmin' && navigate("/transactions/admin");
					res && data.role === 'gatherAdmin' && navigate("/gathers/admin");
				} else {
					const res = await createUser(data, dispatch);	
					res && data.role === 'transactionAdmin' && navigate("/transactions/admin");
					res && data.role === 'gatherAdmin' && navigate("/gathers/admin");
				};
			};
			
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Thêm nhân viên mới" : "Chinh sửa nhân viên"} 
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							label="Email"
							placeholder="Nhập Email"
							name="email"
							handleInputState={handleInputState}
							schema={schema.email}
							handleErrorState={handleErrorState}
							value={data.email}
							error={errors.email}
							required={true}
						/>
					</div>
					{id === "new" && (
						<div className={styles.input_container}>
							<TextField
								label="Mật khẩu"
								placeholder="Nhập mật khẩu"
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
					)}
					<div className={styles.input_container}>
						<TextField
							label="Tên của nhân viên?"
							placeholder="Nhập tên nhân viên"
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
							label="Số điện thoại"
							placeholder="Nhập số điện thoại"
							name="phone"
							handleInputState={handleInputState}
							handleErrorState={handleErrorState}
							value={data.phone}
							error={errors.phone}
							required={true}
						/>
					</div>
					{currentUser.role === "companyAdmin" && (
						<div className={styles.input_container}>
							<Select
								name="role"
								handleInputState={handleInputState}
								label="Chức vụ"
								placeholder="Chọn"
								options={role}
								value={data.role}
								required={true}
							/>
						</div>
					)}
					<div className={styles.input_container}>
						<TextField
							label="Địa chỉ"
							placeholder="Nhập địa chỉ"
							name="address"
							handleInputState={handleInputState}
							handleErrorState={handleErrorState}
							value={data.address}
							error={errors.address}
							required={true}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Tạo" : "Chỉnh sửa"}
						isFetching={id === "new" ? createUserProgress : updateUserProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default StaffForm;
