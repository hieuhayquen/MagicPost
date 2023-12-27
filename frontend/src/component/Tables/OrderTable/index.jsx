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

const OrderTable = ({ orders }) => {
	const [loading, setLoading] = useState(true);
	setTimeout(() => setLoading(false), 1000);

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Mã đơn hàng</TableCell>
						<TableCell align="center">Ngày gửi</TableCell>
						<TableCell align="center">Ngày nhận</TableCell>
						<TableCell align="center">Trạng thái</TableCell>
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
						{orders &&
							orders.length !== 0 &&
							orders.map((order) => (
								<TableRow key={order._id}>
									<TableCell align="center">{order._id}</TableCell>
									<TableCell align="center">{order.daySend}</TableCell>
									<TableCell align="center">{order.dayRecive}</TableCell>
									<TableCell align="center">{order.status}</TableCell>
									<TableCell align="center">
										<Link to={`/orders/${order._id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
									</TableCell>
								</TableRow>
							))}
						{orders && orders.length === 0 && (
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

export default OrderTable;
