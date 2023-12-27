import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TransactionTabel from "../../component/Tables/TransactionTable";
import Button from "../../component/Button";
import AddIcon from "@mui/icons-material/Add";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import styles from "./styles.module.scss"

const TransactionPoint = () => {
	const { transactions } = useSelector((state) => state.transactions);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Điểm giao dịch <HomeWorkIcon />
				</h1>
				<Link to="/transactions/new">
					<Button startIcon={<AddIcon />} label="Thêm điểm giao dịch" />
				</Link>
			</div>
			<TransactionTabel transactions={transactions} />
		</div>
	);
};

export default TransactionPoint;