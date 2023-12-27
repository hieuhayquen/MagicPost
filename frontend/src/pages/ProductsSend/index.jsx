import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../redux/axiosInstance";
import Button from "../../component/Button";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from '@mui/icons-material/Inventory';
import styles from "./styles.module.scss"
import { useState, useEffect } from "react";
import ProductTable from "../../component/Tables/ProductTable";

const ProductsSend = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [ Products, setProducts ] = useState([]);
	
	const id = currentUser.workAt;

	const getProductsSend = async () => {
		try {
			if (currentUser.role === "transactionStaff") {
				const url = process.env.REACT_APP_API_URL + '/transactions/' + id;
				const { data } = await axiosInstance.get(url);
				setProducts(data.data.productsSend);
			} else if(currentUser.role === "gatherStaff"){
				const url = process.env.REACT_APP_API_URL + '/gathers/' + id;
				const { data } = await axiosInstance.get(url);
				setProducts(data.data.productsSend);
			};
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
	 	getProductsSend();
	},[]);
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Kiện hàng <InventoryIcon />
				</h1>
				<Link to="/products/new">
					<Button startIcon={<AddIcon />} label="Thêm kiện hàng mới" />
				</Link>
			</div>
			<ProductTable products={Products} />
		</div>
	);
};

export default ProductsSend;