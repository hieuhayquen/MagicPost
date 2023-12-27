import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct, updateProduct } from "../../../redux/productSlice/apiCalls";
import { addProductToTransaction } from "../../../redux/transactionSlice/apiCalls";
import { addProductToGather } from "../../../redux/gatherSlice/apiCalls";
import { addProductToUser } from "../../../redux/usersSlice/apiCalls";
import Joi from "joi";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import Button from "../../Button";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import styles from "./styles.module.scss";

const status = [
	{ name: "Đang giao", _id: "Đang giao" },
	{ name: "Giao hàng thành công", _id: "Giao hàng thành công" },
	{ name: "Giao hàng thất bại", _id: "Giao hàng thất bại"},
];

const ProductForm = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [data, setData] = useState({
		senderId: "",
		type: "",
		weight: "",
		desc: "",
		status: "",
		place: "",
	});
	const { products, createProductProgress, updateProductProgress } = useSelector(
		(state) => state.products
	);
	const { users } = useSelector((state) => state.users);
	const customer = users.filter((user) => user.role === 'customer');
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
		type: Joi.string().required().label("Type"),
		weight: Joi.string().required().label("Weight"),
		desc: Joi.string().required().label("Desc"),
	};

	useEffect(() => {
		if (id !== "new" && products) {
			const product = products.filter((product) => product._id === id);
			setData({
				senderId: product[0].senderId,
				type: product[0].type,
				weight: product[0].weight,
				desc: product[0].desc,
				status: product[0].status,
				place: product[0].place,
			});
		}
	}, [id, products]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			if (currentUser.role === 'transactionStaff'){ 
				if (id !== "new") {
					const res = await updateProduct(id, data, dispatch);
					res && navigate("/transaction/products");
				} else {
					const res = await createProduct(data, dispatch);
					const payload = {
						transactionId: currentUser.workAt,
						productId: res._id,
						bool: 'recive',
					}
					const payload2 = {
						userId: res.senderId,
						productId: res._id,
					}
					if (res) {
						addProductToTransaction(payload, dispatch);		
						addProductToUser(payload2, dispatch);
					}
					res && navigate("/transaction/products") ;
				};
			};
			if (currentUser.role === 'gatherStaff'){
				if (id !== "new") {
					const res = await updateProduct(id, data, dispatch);
					res && navigate("/gather/products");
				} else {
					const res = await createProduct(data, dispatch);
					const payload = {
						gatherId: currentUser.workAt,
						productId: res._id,
						bool: 'recive',
					}
					const payload2 = {
						userId: res.senderId,
						productId: res._id,
					}
					if (res) {
						addProductToGather(payload, dispatch);		
						addProductToUser(payload2, dispatch);
					}
					res && navigate("/gather/products") ;
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
					{id === "new" ? "Thêm kiện hàng mới" : "Thông tin kiện hàng"} 
				</h1>
				<form onSubmit={handleSubmit}>
					{currentUser.role !=='customer' && (<div className={styles.input_container}>
						<Select
							name="senderId"
							handleInputState={handleInputState}
							label="Người gửi"
							placeholder="Chọn"
							options={customer}
							value={data.senderId}
							required={true}
						/>
					</div>)}
					<div className={styles.input_container}>
						<TextField
							label="Loại"
							placeholder="Nhập loại hàng"
							name="type"
							handleInputState={handleInputState}
							schema={schema.type}
							handleErrorState={handleErrorState}
							value={data.type}
							error={errors.type}
							required={true}
						/>
					</div>
					
					<div className={styles.input_container}>
						<TextField
							label="Khối lượng"
							placeholder="Nhập khối lượng"
							name="weight"
							handleInputState={handleInputState}
							schema={schema.weight}
							handleErrorState={handleErrorState}
							value={data.weight}
							error={errors.weight}
							required={true}
						/>
					</div>
	
					<div className={styles.input_container}>
						<TextField
							label="Mô tả"
							placeholder="Nhập mô tả"
							name="desc"
							handleInputState={handleInputState}
							schema={schema.desc}
							handleErrorState={handleErrorState}
							value={data.desc}
							error={errors.desc}
							required={true}
						/>
					</div>
					{currentUser.role !== 'customer' && (<div className={styles.input_container}>
						<Select
							name="status"
							handleInputState={handleInputState}
							label="Trạng thái"
							placeholder="Chọn"
							options={status}
							value={data.status}
							required={true}
						/>
					</div>)}
					{currentUser.role ==='customer' && (<div className={styles.input_container}>
						<TextField
							label="Trạng thái"
							name="status"
							value={data.status}
							required={true}
						/>
					</div>)}
					<div className={styles.input_container}>
						<TextField
							label="Vị trí"
							placeholder="Nhập vị trí"
							name="place"
							handleInputState={handleInputState}
							schema={schema.place}
							handleErrorState={handleErrorState}
							value={data.place}
							error={errors.place}
							required={true}
						/>
					</div>
					{currentUser.role !== 'customer' && <Button
						type="submit"
						label={id === "new" ? "Tạo" : "Chỉnh sửa"}
						isFetching={id === "new" ? createProductProgress : updateProductProgress}
						style={{ marginLeft: "auto" }}	
					/>}
				</form>
			</Paper>
		</div>
	);
};

export default ProductForm;
