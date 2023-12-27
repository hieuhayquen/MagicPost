import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StaffTable from "../../component/Tables/StaffTable";
import axiosInstance from "../../redux/axiosInstance";
import Button from "../../component/Button";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styles from "./styles.module.scss"
import { useState, useEffect } from "react";

const Staffs = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [ Staffs, setStaffs ] = useState([]);
	
	const id = currentUser.workAt;
	const getStaffs = async () => {
		try {
			if (currentUser.role === "transactionAdmin") {
				const url = process.env.REACT_APP_API_URL + '/transactions/' + id;
				const { data } = await axiosInstance.get(url);
				setStaffs(data.data.staffs);
			} else if(currentUser.role === "gatherAdmin"){
				const url = process.env.REACT_APP_API_URL + '/gathers/' + id;
				const { data } = await axiosInstance.get(url);
				setStaffs(data.data.staffs);
			};
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
	 	getStaffs();
	},[]);
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
			<StaffTable staffs={Staffs} />
		</div>
	);
};

export default Staffs;