import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../redux/axiosInstance";
import Button from "../../component/Button";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import styles from "./styles.module.scss"
import { useState, useEffect } from "react";
import OrderTable from "../../component/Tables/OrderTable";


const Orders = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [ ordersRecive, setOrdersRecive ] = useState([]);
	
	const id = currentUser.workAt;

	const getProducts = async () => {
		try {
			if (currentUser.role === "transactionStaff") {
				const url = process.env.REACT_APP_API_URL + '/transactions/' + id;
				const { data } = await axiosInstance.get(url);
				setOrdersRecive(data.data.ordersRecive);
			} else if(currentUser.role === "gatherStaff"){
				const url = process.env.REACT_APP_API_URL + '/gathers/' + id;
				const { data } = await axiosInstance.get(url);
				setOrdersRecive(data.data.ordersRecive);
			};
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
	 	getProducts();
	},[]);
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Đơn hàng <LocalShippingIcon />
				</h1>
				<Link to="/orders/new">
					<Button startIcon={<AddIcon />} label="Thêm đơn hàng mới" />
				</Link>
			</div>
			<OrderTable orders={ordersRecive} />
		</div>
	);
};

export default Orders;