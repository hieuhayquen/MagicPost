const router = require("express").Router();
const { Gather , validate } = require("../models/gather");
const { Order } = require("../models/order");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const Joi = require("joi");

// create gather
router.post("/", admin, async (req, res) => {
	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	const gather = await Gather(req.body).save();
	res.status(201).send({ data: gather, message: "Gather created successfully" });
});


// edit gather by id
router.put("/edit/:id", [validateObjectId, auth], async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		address: Joi.string().required(),
		admin: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const gather = await Gather.findById(req.params.id);
	if (!gather) return res.status(404).send({ message: "Gather not found" });

	gather.name = req.body.name;
	gather.address = req.body.address;
	gather.admin = req.body.admin;
	await gather.save();

	res.status(200).send({ data: gather, message: "Updated successfully" });
});

// add order to gather
router.put("/add-order", auth, async (req, res) => {
	const schema = Joi.object({
		gatherId: Joi.string().required(),
		orderId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const gather = await Gather.findById(req.body.gatherId);
	// const user = await User.findById(req.user._id);
	// if (!user._id.equals(gather.admin))
	// 	return res.status(403).send({ message: "User don't have access to add!" });

	if (gather.orders.indexOf(req.body.orderId) === -1) {
		gather.orders.push(req.body.orderId);
	}
	await gather.save();
	res.status(200).send({ data: gather, message: "Added to gather" });
});

// remove order from gather
router.put("/remove-order", auth, async (req, res) => {
	const schema = Joi.object({
		gatherId: Joi.string().required(),
		orderId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const gather = await Gather.findById(req.body.gatherId);
	// const user = await User.findById(req.user._id);
	// if (!user._id.equals(gather.admin))
	// 	return res.status(403).send({ message: "User don't have access to Remove!" });

	const index = gather.orders.indexOf(req.body.orderId);
	gather.orders.splice(index, 1);
	await gather.save();
	res.status(200).send({ data: gather, message: "Removed from gather" });
});

// get gather by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const gather = await Gather.findById(req.params.id);
	if (!gather) return res.status(404).send("not found");

	const orders = await Order.find({ _id: gather.orders });
	res.status(200).send({ data: { gather, orders } });
});

// get all gathers
router.get("/all", async (req, res) => {
	const gathers = await Gather.find();
	res.status(200).send({ data: gathers });
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
