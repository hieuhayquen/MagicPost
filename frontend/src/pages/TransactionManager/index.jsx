import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StaffTable from "../../component/Tables/StaffTable";
import Button from "../../component/Button";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styles from "./styles.module.scss"

const TransactionManagers = () => {
	const { users } = useSelector((state) => state.users);	
	const transactionManagers = users.filter((user) => user.role === 'transactionAdmin');
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Quản lý <PeopleAltIcon />
				</h1>
				<Link to="/users/new">
					<Button startIcon={<AddIcon />} label="Thêm quản lí mới" />
				</Link>
			</div>
			<StaffTable staffs={transactionManagers} />
		</div>
	);
};

export default TransactionManagers;