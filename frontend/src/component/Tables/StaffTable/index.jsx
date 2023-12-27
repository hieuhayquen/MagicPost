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

const StaffTable = ({ staffs }) => {
	const [loading, setLoading] = useState(true);
	setTimeout(() => setLoading(false), 1000);

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Tên</TableCell>
						<TableCell align="center">Email</TableCell>
						<TableCell align="center">Địa chỉ</TableCell>
						<TableCell align="center">Số điện thoại</TableCell>
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
						{staffs &&
							staffs.length !== 0 &&
							staffs.map((user) => (
								<TableRow key={user._id}>
									<TableCell align="center">{user.name}</TableCell>
									<TableCell align="center">{user.email}</TableCell>
									<TableCell align="center">{user.address}</TableCell>
									<TableCell align="center">{user.phone}</TableCell>
									<TableCell align="center">
										<Link to={`/users/${user._id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
									</TableCell>
								</TableRow>
							))}
						{staffs && staffs.length === 0 && (
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

export default StaffTable;
