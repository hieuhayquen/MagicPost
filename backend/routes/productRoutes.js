const router = require("express").Router();
const { User } = require("../models/user");
const { Product, validate } = require("../models/product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");

// Create product
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	const product = await Product(req.body).save();
	res.status(201).send({ data: product, message: "Product created successfully" });
});

// Get all products
router.get("/", async (req, res) => {
	const products = await Product.find();
	res.status(200).send({ data: products });
});

// Update product
router.put("/:id", [validateObjectId], async (req, res) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send({ data: product, message: "Updated product successfully" });
});

// Delete product by ID
router.delete("/:id", [validateObjectId], async (req, res) => {
	await Product.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Product deleted sucessfully" });
});


module.exports = router;
