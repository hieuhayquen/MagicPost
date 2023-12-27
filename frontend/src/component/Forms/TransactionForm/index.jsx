import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../redux/usersSlice/apiCalls";
import { createTransaction, updateTransaction } from "../../../redux/transactionSlice/apiCalls";
import { addTransactionToGather } from "../../../redux/gatherSlice/apiCalls";
import Joi from "joi";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import Button from "../../Button";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import styles from "./styles.module.scss";

const TransactionForm = () => {
	const [data, setData] = useState({
		name: "",
		address: "",
		admin: "",
		staff: [],
		gatherId: "",
		ordersSend: [],
		ordersRecive: [],
		productsSend: [],
		productsRecive: [],
	});
	const { users } = useSelector((state) => state.users);
	const { transactions, createTransactionProgress, updateTransactionProgress } = useSelector((state) => state.transactions);
	const { gathers } = useSelector((state) => state.gathers);
	const admin = users.filter((user) => user.role === 'transactionAdmin' && user.workAt === "");
	
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
		if (id !== "new" && transactions) {
			const transaction = transactions.filter((transaction) => transaction._id === id);
			setData({
				name: transaction[0].name,
				address: transaction[0].address,
				admin: transaction[0].admin,
				gatherId: transaction[0].gatherId,
			});
		}
	}, [id, transactions]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			if (id !== "new") {
				const res = await updateTransaction(id, data, dispatch);
				res && navigate("/transactions");
			} else {
				const res = await createTransaction(data, dispatch);
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
				const payload = {
					gatherId: res.gatherId,
					transactionId: res._id,
				}
				if (res) addTransactionToGather(payload, dispatch);
				res && res2 && navigate("/transactions");
			};	
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Thêm điểm giao dịch" : "Chinh sửa điểm giao dịch"} 
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							label="Tên điểm giao dịch"
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
							label="Địa chỉ điểm giao dịch"
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
					<div className={styles.input_container}>
						<Select
							name="gatherId"
							handleInputState={handleInputState}
							label="Điểm tập kết"
							placeholder="Chọn"
							options={gathers}
							value={data.gatherId}
							required={true}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Tạo" : "Chỉnh sửa"}
						isFetching={id === "new" ? createTransactionProgress : updateTransactionProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default TransactionForm;
