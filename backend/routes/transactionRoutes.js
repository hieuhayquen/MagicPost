const router = require("express").Router();
const { Transaction , validate } = require("../models/transaction");
const { Order } = require("../models/order");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const Joi = require("joi");

// create transaction
router.post("/", admin, async (req, res) => {
	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	const transaction = await Transaction(req.body).save();
	res.status(201).send({ data: transaction, message: "Transaction created successfully" });
});


// edit transaction by id
router.put("/edit/:id", [validateObjectId, auth], async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		address: Joi.string().required(),
		admin: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const transaction = await Transaction.findById(req.params.id);
	if (!transaction) return res.status(404).send({ message: "Transaction not found" });

	transaction.name = req.body.name;
	transaction.address = req.body.address;
	transaction.admin = req.body.admin;
	await transaction.save();

	res.status(200).send({ data: transaction, message: "Updated successfully" });
});

// add order to transaction
router.put("/add-order", auth, async (req, res) => {
	const schema = Joi.object({
		transactionId: Joi.string().required(),
		orderId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const transaction = await Transaction.findById(req.body.transactionId);
	// const user = await User.findById(req.user._id);
	// if (!user._id.equals(transaction.admin))
	// 	return res.status(403).send({ message: "User don't have access to add!" });

	if (transaction.orders.indexOf(req.body.orderId) === -1) {
		transaction.orders.push(req.body.orderId);
	}
	await transaction.save();
	res.status(200).send({ data: transaction, message: "Added to transaction" });
});

// remove order from transaction
router.put("/remove-order", auth, async (req, res) => {
	const schema = Joi.object({
		transactionId: Joi.string().required(),
		orderId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const transaction = await Transaction.findById(req.body.transactionId);
	// const user = await User.findById(req.user._id);
	// if (!user._id.equals(transaction.admin))
	// 	return res.status(403).send({ message: "User don't have access to Remove!" });

	const index = transaction.orders.indexOf(req.body.orderId);
	transaction.orders.splice(index, 1);
	await transaction.save();
	res.status(200).send({ data: transaction, message: "Removed from transaction" });
});

// add staff to transaction
router.put("/add-staff", auth, async (req, res) => {
	const schema = Joi.object({
		transactionId: Joi.string().required(),
		staff: Joi.object(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const transaction = await Transaction.findById(req.body.transactionId);
	
	if (transaction.staff.indexOf(req.body.staff) === -1) {
		transaction.staff.push(req.body.staff);
	}
	await transaction.save();
	res.status(200).send({ data: transaction, message: "Added to transaction" });
});

// remove staff from transaction
router.put("/remove-staff", auth, async (req, res) => {
	const schema = Joi.object({
		transactionId: Joi.string().required(),
		staffId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const transaction = await Transaction.findById(req.body.transactionId);
	// const user = await User.findById(req.user._id);
	// if (!user._id.equals(transaction.admin))
	// 	return res.status(403).send({ message: "User don't have access to Remove!" });

	const index = transaction.orders.indexOf(req.body.staffId);
	transaction.staff.splice(index, 1);
	await transaction.save();
	res.status(200).send({ data: transaction, message: "Removed from transaction" });
});

// get transaction by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const transaction = await Transaction.findById(req.params.id);
	if (!transaction) return res.status(404).send("not found");

	const orders = await Order.find({ _id: transaction.orders });
	res.status(200).send({ data: { transaction, orders } });
});

// get all transactions
router.get("/", async (req, res) => {
	const transactions = await Transaction.find();
	res.status(200).send({ data: transactions });
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
