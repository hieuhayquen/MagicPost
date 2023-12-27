import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../redux/usersSlice/apiCalls";
import { createGather, updateGather } from "../../../redux/gatherSlice/apiCalls";
import Joi from "joi";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import Button from "../../Button";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import styles from "./styles.module.scss";

const GatherForm = () => {
	const [data, setData] = useState({
		name: "",
		address: "",
		admin: "",
		staff: [],
		transactionId: [],
		ordersSend: [],
		ordersRecive: [],
		productsSend: [],
		productsRecive: [],
	});
	const { users } = useSelector((state) => state.users);
	const { gathers, createGatherProgress, updateGatherProgress} = useSelector((state) => state.gathers);
	const admin = users.filter((user) => user.role === 'gatherAdmin' && user.workAt === "");
	
	const [errors, setErrors] = useState({});
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors((errors) => ({ ...errors, [name]: value }));
	};

	const schema = {
		name: Joi.string().min(0).max(20).required(),
		address: Joi.string().min(0).required(),
	};

	useEffect(() => {
		if (id !== "new" && gathers) {
			const gather = gathers.filter((gather) => gather._id === id);
			setData({
				name: gather[0].name,
				address: gather[0].address,
				admin: gather[0].admin,
				gatherId: gather[0].transactionId,
			});
		}
	}, [id, gathers]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			if (id !== "new") {
				const res = await updateGather(id, data, dispatch);
				res && navigate("/gathers");
			} else {
				const res = await createGather(data, dispatch);
				const userAdmin = users.filter((user) => user._id === res.admin);
				const userData = {
					_id: userAdmin[0]._id,
					email: userAdmin[0].email,
					password: userAdmin[0].password,
					name: userAdmin[0].name,
					role: userAdmin[0].role,
					address: userAdmin[0].address,
					phone: userAdmin[0].phone,
					products: userAdmin[0].products,
					workAt: res._id,
				};
				const res2 = await updateUser(userData._id, userData, dispatch);
				res && res2 && navigate("/gathers");
			};	
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Thêm điểm tập kết" : "Chinh sửa điểm tập kết"} 
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							label="Tên điểm tập kết"
							placeholder="Nhập tên điểm"
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
							label="Địa chỉ điểm tập kết"
							placeholder="Nhập địa chỉ điểm"
							name="address"
							handleInputState={handleInputState}
							schema={schema.address}
							handleErrorState={handleErrorState}
							value={data.address}
							error={errors.address}
							required={true}
						/>
					</div>
		
					<div className={styles.input_container}>
						<Select
							name="admin"
							handleInputState={handleInputState}
							label="Quản lí"
							placeholder="Chọn"
							options={admin}
							value={data.admin}
							required={true}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Tạo" : "Chỉnh sửa"}
						isFetching={id === "new" ? createGatherProgress : updateGatherProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default GatherForm;
