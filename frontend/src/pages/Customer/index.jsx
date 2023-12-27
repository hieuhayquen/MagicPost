import { useSelector } from "react-redux";
import axiosInstance from "../../redux/axiosInstance";
import Inventory from "@mui/icons-material/Inventory";
import styles from "./styles.module.scss"
import { useState, useEffect } from "react";
import ProductTable from "../../component/Tables/ProductTable";

const CustomerProducts = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [ Products, setProducts ] = useState([]);
	const id = currentUser._id;

	const getProducts = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + '/users/' + id;
				const { data } = await axiosInstance.get(url);
				setProducts(data.data.products);
				//console.log(currentUser._id);
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
					Kiện hàng <Inventory />
				</h1>
			</div>
			<ProductTable products={Products} />
		</div>
	);
};

export default CustomerProducts;