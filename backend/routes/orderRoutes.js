const router = require("express").Router();
//const { User } = require("../models/user");
const { Order, validate } = require("../models/order");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

// Create order
router.post("/", auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	const order = await Order(req.body).save();
	res.status(201).send({ data: order, message: "Order created successfully" });
});

// Get all orders
router.get("/", async (req, res) => {
	const orders = await Order.find();
	res.status(200).send({ data: orders });
});

// Update order
router.put("/:id", [validateObjectId, auth], async (req, res) => {
	const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send({ data: order, message: "Updated order successfully" });
});

// Delete order by ID
router.delete("/:id", [validateObjectId, auth], async (req, res) => {
	await Order.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Order deleted sucessfully" });
});


module.exports = router;
