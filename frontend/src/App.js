import { Fragment, useEffect, React} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { getAllUsers, getUser } from "./redux/usersSlice/apiCalls";
import { getAllTransactions, getTransaction } from "./redux/transactionSlice/apiCalls";
import { getAllGathers } from "./redux/gatherSlice/apiCalls";
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import SidebarCustomer from "./component/SidebarCustomer";
import SidebarGatherAdmin from "./component/SidebarGatherAdmin";
import SidebarGatherStaff from "./component/SidebarGatherStaff";
import SidebarTransactionAdmin from "./component/SidebarTransactionAdmin";
import SidebarTransactionStaff from "./component/SidebarTransactionStaff";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Staffs from "./pages/TransactionAdmin";
import StaffForm from "./component/Forms/StaffForm";

function App() {
	const dispatch = useDispatch();
	const location = useLocation();
	const { user } = useSelector((state) => state.auth);
	const { currentUser } = useSelector((state) => state.users);
	const { currentTransaction } = useSelector((state) => state.transactions);

	useEffect(() => {
		let token = null;
		const root = JSON.parse(window.localStorage.getItem("persist:root"));

		if (root) {
			const { auth } = root;
			const { user } = JSON.parse(auth);
			if (user) token = user.token;
		}

		if (user && token) {
			getAllUsers(dispatch);
			getUser(user._id, dispatch);
			getAllTransactions(dispatch);
			//getAllGathers(dispatch);
		}
	}, [dispatch, user]);

	
	//console.log(user);
	//const { currentTransaction } = useSelector((state) => state.transactions);
	//getTransaction(currentUser.workAt, dispatch);
	//console.log(currentTransaction);
	//console.log(currentUser);
	//const transaction =  transactions.find({ _id: currentUser.workAt });
	//console.log(transaction);
	return (
		<Fragment>
			{user && user.role === 'companyAdmin' && (
					<Fragment>
						<Navbar />
						<Sidebar />
					</Fragment>
				)}
			{user && user.role === 'gatherAdmin' && (
					<Fragment>
						<Navbar />
						<SidebarGatherAdmin />
					</Fragment>
				)}
			{user && user.role === 'transactionAdmin' && (
					<Fragment>
						<Navbar />
						<SidebarTransactionAdmin /> 
						 <Routes>
						 	<Route path="/users/:id" element={<div className="main"><StaffForm/></div>} />
							<Route path="/transaction/staffs" element={<div className="main"><Staffs/></div>} />
						</Routes> 
					</Fragment>
			)}
			{user && user.role === 'gatherStaff' && (
					<Fragment>
						<Navbar />
						<SidebarGatherStaff />
					</Fragment>
				)}
			{user && user.role === 'transactionStaff' && (
					<Fragment>
						<Navbar />
						<SidebarTransactionStaff />
					</Fragment>
			)}
			{user && user.role === 'customer' && (
					<Fragment>
						<Navbar />
						<SidebarCustomer />
					</Fragment>
			)}

			{!user && 
				<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				<Route path="/not-found" element={<NotFound />} />
				<Route path="/*" element={
					<Navigate to='/not-found'/>
				}/>
				</Routes>
			}; 
		</Fragment>
	);
};


export default App;
