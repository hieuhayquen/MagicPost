const router = require("express").Router();
const { User } = require("../models/user");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
	const search = req.query.search;
	if (search !== "") {
		const users = await User.find({
			name: { $regex: search, $options: "i" },
		}).limit(10);
		const result = { users };
		res.status(200).send(result);
	} else {
		res.status(200).send({});
	}
});

module.exports = router;
