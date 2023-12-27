import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { logout } from "../../redux/authSlice";
import ExitToApp from "@mui/icons-material/ExitToApp";
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import styles from "./styles.module.scss";

const options = [
	{ name: "Thống kê", path: "/", icon: <DashboardIcon /> },
	{ name: "Kiện hàng", path: "/gather/products", icon: <InventoryIcon /> },
	{ name: "Kiện hàng gửi đi", path: "/gather/products-send", icon: <InventoryIcon /> },
	{ name: "Đơn hàng", path: "/gather/orders", icon: <LocalShippingIcon /> },
	{ name: "Đơn hàng gửi đi", path: "/gather/orders-send", icon: <LocalShippingIcon /> },
];

const SidebarGatherStaff = () => {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
		window.location = "/login";
	};

	return (
		<div className={styles.sidebar}>
			<h1 className={styles.logo}>Admin Panel</h1>
			<ul>
				{options.map((option) => (
					<li
						className={option.name === "logout" ? styles.logout_link : ""}
						key={option.name}
					>
						<NavLink
							className={styles.option}
							exact={option.path}
							to={option.path}
							activeclassname={styles.sidebar_active}
						>
							{option.icon}
							<span>{option.name}</span>
						</NavLink>
					</li>
				))}
				<li className={styles.logout_link} onClick={logoutHandler}>
					<div className={styles.option}>
						<ExitToApp />
						<span>logout</span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default SidebarGatherStaff;
