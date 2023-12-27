const router = require("express").Router();
const { Gather , validate } = require("../models/gather");
const { Order } = require("../models/order");
const { User } = require("../models/user");
const { Transaction } = require("../models/transaction");
const { Product } = require("../models/product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const staff = require("../middleware/staff");
const manager = require("../middleware/manager");
const validateObjectId = require("../middleware/validateObjectId");
const Joi = require("joi");

// create gather
router.post("/", admin, async (req, res) => {
	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	const gather = await Gather(req.body).save();
	res.status(201).send({ data: gather, message: "Gather created successfully" });
});

// add order to gather
router.put("/add-order", staff, async (req, res) => {
	const schema = Joi.object({
		gatherId: Joi.string().required(),
		orderId: Joi.string().required(),
		bool: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const gather = await Gather.findById(req.body.gatherId);
	if (req.body.bool === 'send') {
		if (gather.ordersSend.indexOf(req.body.orderId) === -1) {
			gather.ordersSend.push(req.body.orderId);
		}
	} else if (req.body.bool === 'recive'){
		if (gather.ordersRecive.indexOf(req.body.orderId) === -1) {
			gather.ordersRecive.push(req.body.orderId);
		}
	};
	await gather.save();
	res.status(200).send({ data: gather, message: "Added to gather" });
});

// remove order from gather
router.put("/remove/order", auth, async (req, res) => {
	const schema = Joi.object({
		gatherId: Joi.string().required(),
		orderId: Joi.string().required(),
		bool: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const gather = await Gather.findById(req.body.gatherId);
	if (req.body.bool === 'send') {
		const index = gather.ordersSend.indexOf(req.body.orderId);
		gather.ordersSend.splice(index, 1);
	} else if (req.body.bool === 'recive'){
		const index = gather.ordersRecive.indexOf(req.body.orderId);
		gather.ordersRecive.splice(index, 1);
	};
	await gather.save();
	res.status(200).send({ data: gather, message: "Removed from gather" });
});

// add product to gather
router.put("/add-product", staff, async (req, res) => {
	const schema = Joi.object({
		gatherId: Joi.string().required(),
		productId: Joi.string().required(),
		bool: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const gather = await Gather.findById(req.body.gatherId);
	if (req.body.bool === 'send') {
		if (gather.productsSend.indexOf(req.body.productId) === -1) {
			gather.productsSend.push(req.body.productId);
		}
	} else if (req.body.bool === 'recive') {
		if (gather.productsRecive.indexOf(req.body.productId) === -1) {
			gather.productsRecive.push(req.body.productId);
		}
	};
	await gather.save();
	res.status(200).send({ data: gather, message: "Added to gather" });
});

// remove product from gather
router.put("/remove/product", staff, async (req, res) => {
	const schema = Joi.object({
		gatherId: Joi.string().required(),
		productId: Joi.string().required(),
		bool: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const tempgather = await Gather.findById(req.body.gatherId);
	if (req.body.bool === 'send') {
		const index = tempgather.productsSend.indexOf(req.body.productId);
		tempgather.productsSend.splice(index, 1);
	} else if (req.body.bool === 'recive'){
		const index = tempgather.productsRecive.indexOf(req.body.productId);
		tempgather.productsRecive.splice(index, 1);
	};
	const gather = await Gather.findByIdAndUpdate(tempgather._id, tempgather, {
		new: true,
	});
	res.status(200).send({ data: gather, message: "Removed from gather" });
});

// add staff to gather
router.put("/add-staff", manager, async (req, res) => {
	const schema = Joi.object({
		gatherId: Joi.string().required(),
		staffId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const gather = await Gather.findById(req.body.gatherId);
	if (gather.staff.indexOf(req.body.staffId) === -1) {
		gather.staff.push(req.body.staffId);
	}
	await gather.save();
	res.status(200).send({ data: gather, message: "Added staff to gather" });
});

// remove staff from gather
router.put("/remove/staff", manager, async (req, res) => {
	const schema = Joi.object({
		gatherId: Joi.string().required(),
		staffId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const gather = await Gather.findById(req.body.gatherId);
	const index = gather.staff.indexOf(req.body.staffId);
	gather.staff.splice(index, 1);
	await gather.save();
	res.status(200).send({ data: gather, message: "Removed staff from gather" });
});

// add transaction to gather
router.put("/add-transaction", admin, async (req, res) => {
	const schema = Joi.object({
		gatherId: Joi.string().required(),
		transactionId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const gather = await Gather.findById(req.body.gatherId);
	if (gather.transactionId.indexOf(req.body.transactionId) === -1) {
		gather.transactionId.push(req.body.transactionId);
	}
	await gather.save();
	res.status(200).send({ data: gather, message: "Added transaction to gather" });
});

// remove transaction from gather
router.put("/remove-transaction", admin, async (req, res) => {
	const schema = Joi.object({
		gatherId: Joi.string().required(),
		transactionId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const gather = await Gather.findById(req.body.gatherId);
	const index = gather.transactionId.indexOf(req.body.transactionId);
	gather.transactionId.splice(index, 1);
	await gather.save();
	res.status(200).send({ data: gather, message: "Removed transaction from gather" });
});

// get gather by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const gather = await Gather.findById(req.params.id);
	if (!gather) return res.status(404).send("not found");
	const ordersSend = await Order.find({ _id: gather.ordersSend });
	const ordersRecive = await Order.find({ _id: gather.ordersRecive });
	const productsSend = await Product.find({ _id: gather.productsSend });
	const productsRecive = await Product.find({ _id: gather.productsRecive });
	const staffs = await User.find({ _id: gather.staff });
	const transactions = await Transaction.find({_id: gather.transactionId});
	res.status(200).send({ data: { gather, transactions, ordersSend, ordersRecive, productsSend, productsRecive, staffs } });
});

// get all gathers
router.get("/", async (req, res) => {
	const gathers = await Gather.find();
	res.status(200).send({ data: gathers });
});

// Update transaction
router.put("/:id", [validateObjectId, auth], async (req, res) => {
	const gather = await Gather.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send({ data: gather, message: "Updated gather successfully" });
});

// delete gather by id
router.delete("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await User.findById(req.user._id);
	const gather = await Gather.findById(req.params.id);
	const gathers = await Gather.find();
	if (!user.role.equals('companyAdmin'))
		return res
			.status(403)
			.send({ message: "User don't have access to delete!" });

	const index = gathers.indexOf(req.params.id);
	gathers.splice(index, 1);
	await gathers.save();
	await gather.deleteOne();
	res.status(200).send({ message: "Removed gather" });
});

module.exports = router;
