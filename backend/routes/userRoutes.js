const router = require("express").Router();
const { User, validate } = require("../models/user");
const { Product } = require("../models/product")
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const Joi = require("joi");

// create user
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (user) return res.status(403).send({ message: "User with given email already Exist!" });

	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	let newUser = await new User({
		...req.body,
		password: hashPassword,
	}).save();

	newUser.password = undefined;
	newUser.__v = undefined;
	res.status(200).send({ data: newUser, message: "Account created successfully" });
});

// get all users
router.get("/", auth, async (req, res) => {
	const users = await User.find().select("-password -__v");
	res.status(200).send({ data: users });
});

// get user by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await User.findById(req.params.id).select("-password -__v");
	const products = await Product.find({ _id: user.products });
	res.status(200).send({ data: {user, products }});
});

// update user by id
router.put("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	).select("-password -__v");
	res.status(200).send({ data: user, message: "Profile updated successfully" });
});

// delete user by id
router.delete("/:id", [validateObjectId, auth], async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Successfully deleted user." });
});

//add product to user
router.put("/add/product", auth, async (req, res) => {
	const schema = Joi.object({
		userId: Joi.string().required(),
		productId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.body.userId);

	if (user.products.indexOf(req.body.productId) === -1) {
		user.products.push(req.body.productId);
	}
	await user.save();
	res.status(200).send({ data: user, message: "Added product to user" });
});


module.exports = router;
