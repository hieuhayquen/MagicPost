const mongoose = require('mongoose');
const Joi = require('joi');

const transactionSchema = new mongoose.Schema({
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
    gatherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gather',
        required: true,
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

const validate = (transaction) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		address: Joi.string().required(),
		admin: Joi.string().required(),
        staff: Joi.array().items(Joi.string()),
        gatherId: Joi.string().required(),
        ordersSend: Joi.array(),
        ordersRecive: Joi.array(),
        productsSend: Joi.array(),
        productsRecive: Joi.array(),
	});
	return schema.validate(transaction);
};

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = { Transaction, validate };