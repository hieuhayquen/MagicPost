import { Link } from "react-router-dom";
import Button from "../../component/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";

import styles from "./styles.module.scss";

const navLinks = [
	{ name: "About Us", link: "#" },
	{ name: "Hỗ Trợ", link: "#" },
	{ name: "Đăng ký", link: "/signup" },
	{ name: "Đăng nhập", link: "/login" },
];

const companyLInks = ["About", "Jobs", "For the record"];

const communitiesLinks = [
	"For Artists",
	"Developers",
	"Advertising",
	"Investors",
	"Vendors",
];

const usefulLInks = ["Support", "Web Player", "Free Mobile App"];

const footerLinks = [
	"legal",
	"privacy center",
	"privacy policy",
	"Cookies",
	"About ads",
	"Additional CA Privacy Disclosures",
];

const footerIcons = [<InstagramIcon />, <TwitterIcon />, <FacebookIcon />];

const Main = () => {
	return (
		<div className={styles.container}>
			<nav className={styles.navbar_container}>
				<div className={styles.nav_links}>
					{navLinks.map((link, index) => (
						<Link key={index} to={link.link} className={styles.links}>
							{link.name}
						</Link>
					))}
				</div>
			</nav>
			<main className={styles.main_container}>
				<div className={styles.main}>
					<Link to="/signup">
						<Button
							label="Bắt đầu miễn phí"
							style={{ color: "#2941ab", width: "18rem", fontSize: "1.4rem" }}
						/>
					</Link>
				</div>
			</main>
			<footer className={styles.footer_container}>
				<div className={styles.footer_1}>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Company</div>
						{companyLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Communities</div>
						{communitiesLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Useful links</div>
						{usefulLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_icons}>
						{footerIcons.map((icon, index) => (
							<div className={styles.icon} key={index}>
								{icon}
							</div>
						))}
					</div>
				</div>
				<div className={styles.footer_2}>
					<div className={styles.footer_2_links}>
						{footerLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.copy_right}>
						<CopyrightIcon />
						<span>2023 Echo</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Main;

