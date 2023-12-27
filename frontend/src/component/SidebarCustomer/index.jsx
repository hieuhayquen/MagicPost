import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import InventoryIcon from '@mui/icons-material/Inventory';
import ExitToApp from "@mui/icons-material/ExitToApp";
import styles from "./styles.module.scss";

const options = [
	{ name: "Theo dõi kiện hàng", path: "/customer/products", icon: <InventoryIcon /> },
];

const SidebarCustomer = () => {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
		window.location = "/login";
	};

	return (
		<div className={styles.sidebar}>
			<h1 className={styles.logo}>Khách hàng</h1>
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

export default SidebarCustomer;
