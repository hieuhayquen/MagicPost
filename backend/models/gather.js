const mongoose = require('mongoose');
const Joi = require('joi');

const gatherSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    staff:{
        type: Array,
        defult: [],
    },
    transactionId:{
        type: Array,
        default: [],
    },
    ordersSend: {
        type: Array,
        defult: [],
    },
    ordersRecive: {
        type: Array,
        defult: [],
    },
    productsSend: {
        type: Array,
        defult: [],
    },
    productsRecive: {
        type: Array,
        defult: [],
    },
});

const validate = (gather) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		address: Joi.string().required(),
		admin: Joi.string().required(),
        staff: Joi.array(),
        transactionId: Joi.array(),
        ordersSend: Joi.array(),
        ordersRecive: Joi.array(),
        productsSend: Joi.array(),
        productsRecive: Joi.array(),
	});
	return schema.validate(gather);
};

const Gather = mongoose.model("gather", gatherSchema);

module.exports = { Gather, validate };