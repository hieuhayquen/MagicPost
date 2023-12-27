import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StaffTable from "../../component/Tables/StaffTable";
import Button from "../../component/Button";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styles from "./styles.module.scss"

const GatherManagers = () => {
	const { users } = useSelector((state) => state.users);

	const gatherManagers = users.filter((user) => user.role === 'gatherAdmin')
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Quản lý <PeopleAltIcon />
				</h1>
				<Link to="/users/new">
					<Button startIcon={<AddIcon />} label="Thêm quản li mới" />
				</Link>
			</div>
			<StaffTable staffs={gatherManagers} />
		</div>
	);
};

export default GatherManagers;