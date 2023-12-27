import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, updateOrder } from "../../../redux/orderSlice/apiCalls";
import { addOrderToTransaction, addProductToTransaction } from "../../../redux/transactionSlice/apiCalls";
import { addOrderToGather, removeProductFromGather, addProductToGather} from "../../../redux/gatherSlice/apiCalls";
import axiosInstance from "../../../redux/axiosInstance";
import Joi from "joi";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import Button from "../../Button";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import styles from "./styles.module.scss";

const status = [
	{ name: "Đang chờ xác nhận", _id: "Đang chờ xác nhận" },
	{ name: "Đã xác nhận", _id: "Đã xác nhận" },
];

const OrderForm = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [data, setData] = useState({
		userSendName: "",
        userSendAddress: "",
        userSendPhone: "",
        userReciveName: "",
        userReciveAddress: "",
        userRecivePhone: "",
		senderId: "",
        senderName: "",
		reciverId: "",
        reciverName: "",
		price: "",
		status: "",
		daySend: "",
        dayRecive: "",
        productId: "",
	});
	const { transactions } = useSelector((state) => state.transactions);
	const { gathers } = useSelector((state) => state.gathers);
	const { orders, createOrderProgress, updateOrderProgress } = useSelector(
		(state) => state.orders
	);
	
	const [errors, setErrors] = useState({});
	const [ nextTerminal, setTerminal ] = useState([]);
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};
	//
	const getTransactionOfGather = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + '/gathers/' + currentUser.workAt;
			const { data } = await axiosInstance.get(url);
			const terminals = gathers.concat(data.data.transactions);
			setTerminal(terminals);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTransactionOfGather();
    },[]);

   if (id === 'new'){
		const cgather = gathers.filter((gather) => gather._id === currentUser.workAt);
		data.senderId = cgather[0]._id;
		data.senderName = cgather[0].name;
    }

	if (data.reciverId) {
		const lastTerminal = gathers.concat(transactions);
		const terminal = lastTerminal.filter((terminal) => terminal._id === data.reciverId);
		if (terminal.length !== 0 ) data.reciverName = terminal[0].name;
	}
	
	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors((errors) => ({ ...errors, [name]: value }));
	};

	const schema = {
		name: Joi.string().required(),
		address: Joi.string().required(),
		id: Joi.string().required(),
		price: Joi.number().required(),
		date: Joi.date(),
	};

	useEffect(() => {
		if (id !== "new" && orders) {
			const order = orders.filter((order) => order._id === id);
			setData({
				userSendName: order[0].userSendName,
        		userSendAddress: order[0].userSendAddress,
        		userSendPhone: order[0].userSendPhone,
        		userReciveName: order[0].userReciveName,
        		userReciveAddress: order[0].userReciveAddress,
        		userRecivePhone: order[0].userRecivePhone,
				senderId: order[0].senderId,
        		senderName: order[0].senderName,
				reciverId: order[0].reciverId,
        		reciverName: order[0].reciverName,
				price: order[0].price,
				status: order[0].status,
        		productId: order[0].productId,
				daySend: order[0].daySend,
				dayRecive: order[0].dayRecive,
			});
		}
	}, [id, orders]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
				if (id !== "new") {
					const res = await updateOrder(id, data, dispatch);
					res && navigate("/gather/orders");
				} else {
					const res = await createOrder(data, dispatch);
					const payload = {
						gatherId: currentUser.workAt,
						orderId: res._id,
						bool: 'send',
					}
					if (res) await addOrderToGather(payload, dispatch);	
					// xoa product khoi prodcutRecive cua gather
					await removeProductFromGather({gatherId: res.senderId, productId: res.productId, bool: 'recive'}, dispatch);
					// them product vao productSend cua gather
					await addProductToGather({gatherId: res.senderId, productId: res.productId, bool: 'send'}, dispatch);
					// them order vao gather
					const res2 = await addOrderToGather({gatherId: res.reciverId, orderId: res._id, bool: 'recive'}, dispatch);
					//neu thanh cong, them product vao productRecive cua gather
					if (res2) addProductToGather({gatherId: res.reciverId, productId: res.productId, bool: 'recive'}, dispatch);
					// neu khong thanh cong them vao transaction
					if (!res2) {
						await addOrderToTransaction({transactionId: res.reciverId, orderId: res._id, bool: 'recive'}, dispatch);
						await addProductToTransaction({transactionId: res.reciverId, productId: res.productId, bool: 'recive'}, dispatch);
					};		
					res && navigate("/gather/orders") ;
				};
					
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Thêm đơn hàng mới" : "Chinh sửa đơn hàng"} 
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<div className={styles.flex_items}>
							<TextField
								label="Tên người gửi"
								placeholder="Họ và tên"
								name="userSendName"
								handleInputState={handleInputState}
								schema={schema.name}
								handleErrorState={handleErrorState}
								value={data.userSendName}
								error={errors.name}
								required={true}
							/>
						</div>
						<div className={styles.flex_items}>
							<TextField
								label="Tên người nhận"
								placeholder="Họ và tên"
								name="userReciveName"
								handleInputState={handleInputState}
								schema={schema.name}
								handleErrorState={handleErrorState}
								value={data.userReciveName}
								error={errors.name}
								required={true}
							/>
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.flex_items}>
							<TextField
								label="Địa chỉ người gửi"
								placeholder="Nhập địa chỉ"
								name="userSendAddress"
								handleInputState={handleInputState}
								schema={schema.address}
								handleErrorState={handleErrorState}
								value={data.userSendAddress}
								error={errors.address}
								required={true}
							/>
						</div>
						<div className={styles.flex_items}>
							<TextField
								label="Địa chỉ người nhận"
								placeholder="Nhập địa chỉ"
								name="userReciveAddress"
								handleInputState={handleInputState}
								schema={schema.address}
								handleErrorState={handleErrorState}
								value={data.userReciveAddress}
								error={errors.address}
								required={true}
							/>
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.flex_items}>
							<TextField
								label="Số điện thoại người gửi"
								placeholder="Số điện thoại"
								name="userSendPhone"
								handleInputState={handleInputState}
								schema={schema.name}
								handleErrorState={handleErrorState}
								value={data.userSendPhone}
								error={errors.name}
								required={true}
							/>
						</div>
						<div className={styles.flex_items}>
							<TextField
								label="Số điện thoại người nhận"
								placeholder="Số điện thoại"
								name="userRecivePhone"
								handleInputState={handleInputState}
								schema={schema.name}
								handleErrorState={handleErrorState}
								value={data.userRecivePhone}
								error={errors.name}
								required={true}
							/>
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.flex_items}>
							<TextField
								label="Nơi gửi"
								placeholder="Nơi gửi"
								name="senderName"
								handleInputState={handleInputState}
								schema={schema.name}
								handleErrorState={handleErrorState}
								value={data.senderName}
								error={errors.name}
								required={true}
							/>
						</div>							
							<div className={styles.flex_items}>
								<Select
									name="reciverId"
									handleInputState={handleInputState}
									label="Nơi nhận"
									placeholder="Chọn"
									options={nextTerminal}
									value={data.reciverId}
									required={true}
								/>
							</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.flex_items2}>
							<TextField
								label="Mã sản phẩm"
								placeholder="Nhập mã sản phẩm"
								name="productId"
								handleInputState={handleInputState}
								schema={schema.id}
								handleErrorState={handleErrorState}
								value={data.productId}
								error={errors.id}
								required={true}
							/>
						</div>
						<div className={styles.flex_items2}>
							<Select
								name="status"
								handleInputState={handleInputState}
								label="Trạng thái"
								placeholder="Chọn"
								options={status}
								value={data.status}
								required={true}
							/>
						</div>
						<div className={styles.flex_items2}>
							<TextField
								label="Cước phí"
								placeholder="Cước phí"
								name="price"
								handleInputState={handleInputState}
								schema={schema.price}
								handleErrorState={handleErrorState}
								value={data.price}
								error={errors.price}
								required={true}
							/>
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.flex_items}>
							<TextField
								label="Ngày gửi"
								placeholder="YYYY/MM/DD"
								name="daySend"
								handleInputState={handleInputState}
								schema={schema.date}
								handleErrorState={handleErrorState}
								value={data.daySend}
								error={errors.date}
								required={true}
							/>
						</div>
						<div className={styles.flex_items}>
							<TextField
								label="Ngày nhận"
								placeholder="YYYY/MM/DD"
								name="dayRecive"
								handleInputState={handleInputState}
								schema={schema.date}
								handleErrorState={handleErrorState}
								value={data.dayRecive}
								error={errors.date}
								required={true}
							/>
						</div>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Tạo" : "Cập nhật"}
						isFetching={id === "new" ? createOrderProgress : updateOrderProgress}
						style={{ marginLeft: "40rem" }}
						
					/>
				</form>
			</Paper>
		</div>
	);
};

export default OrderForm;
