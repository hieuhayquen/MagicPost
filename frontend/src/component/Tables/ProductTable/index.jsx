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

const ProductTable = ({ products }) => {
	const [loading, setLoading] = useState(true);
	setTimeout(() => setLoading(false), 1000);

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Mã Sản Phẩm</TableCell>
						<TableCell align="center">Thông tin</TableCell>
						<TableCell align="center">Trạng Thái</TableCell>
						<TableCell align="center">Vị trí</TableCell>
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
						{products &&
							products.length !== 0 &&
							products.map((product) => (
								<TableRow key={product._id}>
									<TableCell align="center">{product._id}</TableCell>
									<TableCell align="center">{product.desc}</TableCell>
									<TableCell align="center">{product.status}</TableCell>
									<TableCell align="center">{product.place}</TableCell>
									<TableCell align="center">
										<Link to={`/products/${product._id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
									</TableCell>
								</TableRow>
							))}
						{products && products.length === 0 && (
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

export default ProductTable;
