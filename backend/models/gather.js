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
    orders: {
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
        orders: Joi.array(),
	});
	return schema.validate(gather);
};

const Gather = mongoose.model('gather', gatherSchema);

module.exports = { Gather, validate };