import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { logout } from "../../redux/authSlice";
import PeopleIcon from "@mui/icons-material/People";
import ExitToApp from "@mui/icons-material/ExitToApp";
import styles from "./styles.module.scss";

const options = [
	{ name: "Hồ sơ", path: "/", icon: <PeopleIcon /> },
	{ name: "Đơn hàng", path: "/", icon: <PeopleIcon /> },
];

const SidebarCustomer = () => {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
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
