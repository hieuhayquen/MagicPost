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
    orders: {
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
        orders: Joi.array().items(Joi.string()),
	});
	return schema.validate(transaction);
};

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = { Transaction, validate };