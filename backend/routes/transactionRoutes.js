const router = require("express").Router();
const { Transaction , validate } = require("../models/transaction");
const { Order } = require("../models/order");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const staff = require("../middleware/staff");
const manager = require("../middleware/manager");
const validateObjectId = require("../middleware/validateObjectId");
const Joi = require("joi");

// create transaction
router.post("/", admin, async (req, res) => {
	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	const transaction = await Transaction(req.body).save();
	res.status(201).send({ data: transaction, message: "Transaction created successfully" });
});

// add order to transaction
router.put("/add-order", staff, async (req, res) => {
	const schema = Joi.object({
		transactionId: Joi.string().required(),
		orderId: Joi.string().required(),
		bool: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const transaction = await Transaction.findById(req.body.transactionId);
	if (req.body.bool === 'send') {
		if (transaction.ordersSend.indexOf(req.body.orderId) === -1) {
			transaction.ordersSend.push(req.body.orderId);
		}
	} else if (req.body.bool === 'recive'){
		if (transaction.ordersRecive.indexOf(req.body.orderId) === -1) {
			transaction.ordersRecive.push(req.body.orderId);
		}
	};
	await transaction.save();
	res.status(200).send({ data: transaction, message: "Added to transaction" });
});

// remove order from transaction
router.put("/remove/order", staff, async (req, res) => {
	const schema = Joi.object({
		transactionId: Joi.string().required(),
		orderId: Joi.string().required(),
		bool: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const transaction = await Transaction.findById(req.body.transactionId);
	if (req.body.bool === 'send') {
		const index = transaction.ordersSend.indexOf(req.body.orderId);
		transaction.ordersSend.splice(index, 1);
	} else if (req.body.bool === 'recive'){
		const index = transaction.ordersRecive.indexOf(req.body.orderId);
		transaction.ordersRecive.splice(index, 1);
	};
	await transaction.save();
	res.status(200).send({ data: transaction, message: "Removed from transaction" });
});

// add product to transaction
router.put("/add-product", staff, async (req, res) => {
	const schema = Joi.object({
		transactionId: Joi.string().required(),
		productId: Joi.string().required(),
		bool: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const transaction = await Transaction.findById(req.body.transactionId);
	if (req.body.bool === 'send') {
		if (transaction.productsSend.indexOf(req.body.productId) === -1) {
			transaction.productsSend.push(req.body.productId);
		}
	} else if (req.body.bool === 'recive') {
		if (transaction.productsRecive.indexOf(req.body.productId) === -1) {
			transaction.productsRecive.push(req.body.productId);
		}
	};
	await transaction.save();
	res.status(200).send({ data: transaction, message: "Added to transaction" });
});

// remove product from transaction
router.put("/remove/product", staff, async (req, res) => {
	const schema = Joi.object({
		transactionId: Joi.string().required(),
		productId: Joi.string().required(),
		bool: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const temptransaction = await Transaction.findById(req.body.transactionId);
	if (req.body.bool === 'send') {
		const index = temptransaction.productsSend.indexOf(req.body.productId);
		temptransaction.productsSend.splice(index, 1);
	} else if (req.body.bool === 'recive'){
		const index = temptransaction.productsRecive.indexOf(req.body.productId);
		temptransaction.productsRecive.splice(index, 1);
	};
	const transaction = await Transaction.findByIdAndUpdate(temptransaction._id, temptransaction, {
		new: true,
	});
	res.status(200).send({ data: transaction, message: "Removed from transaction" });
});

// add staff to transaction
router.put("/add-staff", manager, async (req, res) => {
	const schema = Joi.object({
		transactionId: Joi.string().required(),
		staffId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const transaction = await Transaction.findById(req.body.transactionId);
	if (transaction.staff.indexOf(req.body.staffId) === -1) {
		transaction.staff.push(req.body.staffId);
	}
	await transaction.save();
	res.status(200).send({ data: transaction, message: "Added to transaction" });
});

// remove staff from transaction
router.put("/remove/staff", manager, async (req, res) => {
	const schema = Joi.object({
		transactionId: Joi.string().required(),
		staffId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const transaction = await Transaction.findById(req.body.transactionId);
	const index = transaction.staff.indexOf(req.body.staffId);
	transaction.staff.splice(index, 1);
	await transaction.save();
	res.status(200).send({ data: transaction, message: "Removed from transaction" });
});

// get transaction by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const transaction = await Transaction.findById(req.params.id);
	if (!transaction) return res.status(404).send("not found");
	const ordersSend = await Order.find({ _id: transaction.ordersSend });
	const ordersRecive = await Order.find({ _id: transaction.ordersRecive });
	const productsSend = await Product.find({ _id: transaction.productsSend });
	const productsRecive = await Product.find({ _id: transaction.productsRecive });
	const staffs = await User.find({ _id: transaction.staff });
	res.status(200).send({ data: { transaction, ordersSend, ordersRecive, productsSend, productsRecive, staffs } });
});

// get all transactions
router.get("/", async (req, res) => {
	const transactions = await Transaction.find();
	res.status(200).send({ data: transactions });
});

// Update transaction
router.put("/:id", [validateObjectId, auth], async (req, res) => {
	const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send({ data: transaction, message: "Updated transaction successfully" });
});

// delete transaction by id
router.delete("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await User.findById(req.user._id);
	const transaction = await Transaction.findById(req.params.id);
	const transactions = await Transaction.find();
	if (!user.role.equals('companyAdmin'))
		return res
			.status(403)
			.send({ message: "User don't have access to delete!" });

	const index = transactions.indexOf(req.params.id);
	transactions.splice(index, 1);
	await transactions.save();
	await transaction.deleteOne();
	res.status(200).send({ message: "Removed transaction" });
});

module.exports = router;
