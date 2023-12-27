import { useState } from "react";
import { Link } from "react-router-dom";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	IconButton,
	CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./styles.module.scss";

const TransactionTabel = ({ transactions }) => {
	const [loading, setLoading] = useState(true);
	setTimeout(() => setLoading(false), 1000);

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Tên</TableCell>
						<TableCell align="center">Địa chỉ</TableCell>
						<TableCell align="center">Số lượng hàng gửi</TableCell>
						<TableCell align="center">Số lượng hàng nhận</TableCell>
						<TableCell align="center">Chi tiết</TableCell>
					</TableRow>
				</TableHead>
				{loading && (
					<TableBody>
						<TableRow>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center">
								<CircularProgress
									style={{ color: "#1ed760", margin: "2rem 0" }}
								/>
							</TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableBody>
				)}
				{!loading && (
					<TableBody>
						{transactions &&
							transactions.length !== 0 &&
							transactions.map((transaction) => (
								<TableRow key={transaction._id}>
									<TableCell align="center">{transaction.name}</TableCell>
									<TableCell align="center">{transaction.address}</TableCell>
									<TableCell align="center">{transaction.productsSend.length}</TableCell>
									<TableCell align="center">{transaction.productsSend.length + transaction.productsRecive.length}</TableCell>
									<TableCell align="center">
										<Link to={`/transactions/${transaction._id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link> 
									</TableCell>
								</TableRow>
							))}
						{transactions && transactions.length === 0 && (
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						)}
					</TableBody>
				)}
			</Table>
		</TableContainer>
	);
};

export default TransactionTabel;
