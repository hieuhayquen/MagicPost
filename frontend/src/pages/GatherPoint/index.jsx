import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GatherTabel from "../../component/Tables/GatherTable";
import Button from "../../component/Button";
import AddIcon from "@mui/icons-material/Add";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import styles from "./styles.module.scss"

const GatherPoint = () => {
	const { gathers } = useSelector((state) => state.gathers);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Điểm tập kết <HomeWorkIcon />
				</h1>
				<Link to="/gathers/new">
					<Button startIcon={<AddIcon />} label="Thêm điểm tập kết" />
				</Link>
			</div>
			<GatherTabel gathers={gathers} />
		</div>
	);
};

export default GatherPoint;