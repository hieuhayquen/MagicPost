import { Fragment, useEffect, React} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { getAllUsers, getUser } from "./redux/usersSlice/apiCalls";
import { getAllTransactions } from "./redux/transactionSlice/apiCalls";
import { getAllProducts } from "./redux/productSlice/apiCalls";
import { getAllGathers } from "./redux/gatherSlice/apiCalls";
import { getAllOrders } from "./redux/orderSlice/apiCalls";
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
import Staffs from "./pages/Staffs";
import StaffForm from "./component/Forms/StaffForm";
import ProductForm from "./component/Forms/ProductForm";
import Products from "./pages/Products";
import ProductsSend from "./pages/ProductsSend";
import OrderForm from "./component/Forms/OrderForm";
import OrderFormByTransaction from "./component/Forms/OrderFormByTransaction";
import Orders from "./pages/Orders";
import OrdersSend from "./pages/OrdersSend";
import TransactionManagers from "./pages/TransactionManager";
import GatherManagers from "./pages/GatherManager";
import TransactionPoint from "./pages/TransactionPoint";
import GatherPoint from "./pages/GatherPoint";
import TransactionForm from "./component/Forms/TransactionForm";
import CustomerProducts from "./pages/Customer";


function App() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { currentUser } = useSelector((state) => state.users);

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
			getAllProducts(dispatch);
			getAllGathers(dispatch);
			getAllOrders(dispatch);
		}
	}, [dispatch, user]);

	return (
		<Fragment>
			{user && user.role === 'companyAdmin' && currentUser &&(
					<Fragment>
						<Navbar />
						<Sidebar />
						<Routes>
							<Route path="/" element={<div className="main"><GatherPoint/></div>} />
						 	<Route path="/users/:id" element={<div className="main"><StaffForm/></div>} />
							<Route path="/transactions" element={<div className="main"><TransactionPoint/></div>} />
							<Route path="/transactions/admin" element={<div className="main"><TransactionManagers/></div>} />
							<Route path="/transactions/:id" element={<div className="main"><TransactionForm/></div>} />
							<Route path="/gathers" element={<div className="main"><GatherPoint/></div>} />
							<Route path="/gathers/admin" element={<div className="main"><GatherManagers/></div>} />
						</Routes>
					</Fragment>
				)}
			{user && user.role === 'gatherAdmin' && currentUser &&(
					<Fragment>
						<Navbar />
						<SidebarGatherAdmin />
						<Routes>
							<Route path="/" element={<div className="main"><Staffs/></div>} />	
						 	<Route path="/users/:id" element={<div className="main"><StaffForm/></div>} />
							<Route path="/gather/staffs" element={<div className="main"><Staffs/></div>} />
						</Routes> 
					</Fragment>
				)}
			{user && user.role === 'transactionAdmin' && currentUser && (
					<Fragment>
						<Navbar />
						<SidebarTransactionAdmin /> 
						<Routes>
							<Route path="/" element={<div className="main"><Staffs/></div>} />
						 	<Route path="/users/:id" element={<div className="main"><StaffForm/></div>} />
							<Route path="/transaction/staffs" element={<div className="main"><Staffs/></div>} />
						</Routes> 
					</Fragment>
			)}
			{user && user.role === 'gatherStaff' && currentUser &&(
					<Fragment>
						<Navbar />
						<SidebarGatherStaff />
						<Routes>
							<Route path="/" element={<div className="main"><Products/></div>} />
						 	<Route path="/products/:id" element={<div className="main"><ProductForm/></div>} />
							<Route path="/gather/products" element={<div className="main"><Products/></div>} />
							<Route path="/gather/products-send" element={<div className="main"><ProductsSend/></div>} />
							<Route path="/orders/:id" element={<div className="main"><OrderForm/></div>} />
							<Route path="/gather/orders" element={<div className="main"><Orders/></div>} />
							<Route path="/gather/orders-send" element={<div className="main"><OrdersSend/></div>} />
						</Routes> 
					</Fragment>
				)}
			{user && user.role === 'transactionStaff' && currentUser &&(
					<Fragment>
						<Navbar />
						<SidebarTransactionStaff />
						<Routes>
							<Route path="/" element={<div className="main"><Products/></div>} />
						 	<Route path="/products/:id" element={<div className="main"><ProductForm/></div>} />
							<Route path="/transaction/products" element={<div className="main"><Products/></div>} />
							<Route path="/transaction/products-send" element={<div className="main"><ProductsSend/></div>} />
							<Route path="/orders/:id" element={<div className="main"><OrderFormByTransaction/></div>} />
							<Route path="/transaction/orders" element={<div className="main"><Orders/></div>} />
							<Route path="/transaction/orders-send" element={<div className="main"><OrdersSend/></div>} />
						</Routes> 
					</Fragment>
			)}
			{user && user.role === 'customer' && currentUser && (
					<Fragment>
						<Navbar />
						<SidebarCustomer />
						<Routes>
							<Route path="/" element={<div className="main"><CustomerProducts/></div>} />
							<Route path="/customer/products" element={<div className="main"><CustomerProducts/></div>} />
							<Route path="/products/:id" element={<div className="main"><ProductForm/></div>} />
						</Routes> 
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
