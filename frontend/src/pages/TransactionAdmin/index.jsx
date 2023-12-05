import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import StaffTable from "../../component/Tables/StaffTable";
import { setCurrentTransaction } from "../../redux/manage";
import axiosInstance from "../../redux/axiosInstance";
import Button from "../../component/Button";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styles from "./styles.module.scss"
import { useState, useEffect } from "react";

const Staffs = () => {
	//const { currentStaff } = useSelector((state) => state.manage);
	//const { currentOrder } = useSelector((state) => state.manage);
	const { currentUser } = useSelector((state) => state.users);
	const [ transactionStaffs, setTransactionStaff ] = useState([]);
	const dispatch = useDispatch();
	const id = currentUser.workAt;
	console.log(id);

	const getTransactionStaffs = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + '/transactions/' + id;
			const { data } = await axiosInstance.get(url);
			//console.log(data.data);
			dispatch(setCurrentTransaction(data.data));
			setTransactionStaff(data.data.transaction.staff);
			console.log(data.data.transaction.staff);
		} catch (error) {
			console.log(error);
		}
	};

	// const getStaffData = async (item) => {
	// 	try {
	// 		const url = process.env.REACT_APP_API_URL + '/users/' + item;
	// 		console.log(item);
	// 		const { staffData } = await axiosInstance.get(url);
	// 		StaffsData.push(staffData);
	// 	} catch (error){
	// 		console.log(error);
	// 	}
	// }
	useEffect(() => {
	 	getTransactionStaffs();
	},[]);
	console.log(transactionStaffs);
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Nhân viên <PeopleAltIcon />
				</h1>
				<Link to="/users/new">
					<Button startIcon={<AddIcon />} label="Thêm nhân viên mới" />
				</Link>
			</div>
			<StaffTable staffs={transactionStaffs} />
		</div>
	);
};

export default Staffs;