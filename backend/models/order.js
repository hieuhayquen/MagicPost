const mongoose = require('mongoose');
const Joi = require('joi');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    senderId:{
        type: ObjectId,
        ref: 'user',
        required: true,
    },
    reciverId:{
        type: ObjectId,
        ref: 'user',
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    daySend:{
        type: Date,
        required: true,
    },
    dayRecive:{
        type : Date,
    },
    productId: {
        type: Array,
        default: [],
    },
    currentTerminal:{
        type: ObjectId,
        required: true,
    },
    nextTerminal:{
        type: ObjectId,
        required: true,
    }
});

const validate = (order) => {
	const schema = Joi.object({
		senderId: Joi.string().required(),
		reciverId: Joi.string().required(),
		price: Joi.number().required(),
		status: Joi.string().required(),
		daySend: Joi.date().required(),
        dayRecive: Joi.date().allow(''),
        productId: Joi.array().items(Joi.string()),
        currentTerminal: Joi.string().required(),
        nextTerminal: Joi.string().required(),

	});
	return schema.validate(order);
};

const Order = mongoose.model("order", orderSchema);

module.exports = { Order, validate };