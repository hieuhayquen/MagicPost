import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, updateUser } from "../../../redux/usersSlice/apiCalls";
import { addStaffToTransaction, removeStaffFromTransaction } from "../../../redux/transactionSlice/apiCalls";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import Button from "../../Button";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import Radio from "../../Inputs/Radio";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./styles.module.scss";
//var ObjectID = require('mongodb').ObjectID;

const StaffForm = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [data, setData] = useState({
		
		email: "",
		password: "",
		name: "",
		role: "",
		address: "",
		phone: "",
		orders: [],
		workAt: currentUser.workAt,
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


	if (currentUser.role === 'gatherAdmin') data.role = 'gatherStaff';

	if (currentUser.role === 'transactionAdmin') data.role = 'transactionStaff';


	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors((errors) => ({ ...errors, [name]: value }));
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		name: Joi.string().min(3).max(10).required().label("Name"),
	};

	useEffect(() => {
		if (id !== "new" && users) {
			const user = users.filter((user) => user._id === id);
			//const newId = new ObjectID();
			setData({
				//_id : newId,
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
			if (id !== "new") {
				const res = await updateUser(id, data, dispatch);
				res && navigate("/transaction/staffs");
			} else {
				const res = await createUser(data, dispatch);
				///console.log(res.json());
				const payload = {
					transactionId: data.workAt,
					staff: data,
				}
				console.log(payload);
				addStaffToTransaction(payload, dispatch);
				
				res && navigate("/transaction/staffs");
			}
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Thêm nhân viên mới" : "Chinh sửa nhân viên"} <PersonIcon />
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
							//schema={schema.name}
							handleErrorState={handleErrorState}
							value={data.phone}
							error={errors.phone}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							label="Địa chỉ"
							placeholder="Nhập địa chỉ"
							name="address"
							handleInputState={handleInputState}
							//schema={schema.name}
							handleErrorState={handleErrorState}
							value={data.address}
							error={errors.address}
							required={true}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Submit" : "Update"}
						isFetching={id === "new" ? createUserProgress : updateUserProgress}
						style={{ marginLeft: "auto" }}
						
					/>
				</form>
			</Paper>
		</div>
	);
};

export default StaffForm;
