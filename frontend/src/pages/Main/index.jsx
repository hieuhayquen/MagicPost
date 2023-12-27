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

const companyLInks = ["Về chúng tôi", "Việc làm", "Lịch sử công ty"];

const communitiesLinks = [
	"Cơ hội việc làm",
	"Quảng cáo",
	"Nhà đầu tư",
	"Đối tác",
];

const usefulLInks = ["Hỗ trợ", "Trình duyệt web", "Ứng dụng điện thoại"];

const footerLinks = [
	"Pháp lý",
	"Trung tâm bảo mật",
	"Chính sách bảo mật",
	"Cookies",
	"Quảng cáo",
];

const footerIcons = [<InstagramIcon />, <TwitterIcon />, <FacebookIcon />];

const Main = () => {
	return (
		<div className={styles.container}>
			<nav className={styles.navbar_container}>
				<h1>MagicPost</h1>
				<div className={styles.nav_links}>
					{navLinks.map((link, index) => (
						<Link key={index} to={link.link} className={styles.links}>
							{link.name}
						</Link>
					))}
				</div>
			</nav>
			<main className={styles.main_container}>
				
			</main>
			<footer className={styles.footer_container}>
				<div className={styles.footer_1}>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Công ty</div>
						{companyLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Cộng đồng</div>
						{communitiesLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Tiện ích</div>
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
						<span>Magic Post</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Main;

