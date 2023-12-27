const mongoose = require('mongoose');
const Joi = require('joi');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    userSendName:{
        type: String,
        required: true,
    },
    userSendAddress:{
        type: String,
        required: true,
    },
    userSendPhone:{
        type: String,
        required: true,
    },
    userReciveName:{
        type: String,
        required: true,
    },
    userReciveAddress:{
        type: String,
        required: true,
    },
    userRecivePhone:{
        type: String,
        required: true,
    },
    senderId:{
        type: ObjectId,
        required: true,
    },
    senderName:{
        type: String,
    },
    reciverId:{
        type: String,
        required: true,
    },
    reciverName:{
        type: String,
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
        type: String,
        default: null,
    },
});

const validate = (order) => {
	const schema = Joi.object({
        userSendName: Joi.string().required(),
        userSendAddress: Joi.string().required(),
        userSendPhone: Joi.string().required(),
        userReciveName: Joi.string().required(),
        userReciveAddress: Joi.string().required(),
        userRecivePhone: Joi.string().required(),
		senderId: Joi.string().required(),
        senderName: Joi.string().required(),
		reciverId: Joi.string().required(),
        reciverName: Joi.string().required(),
		price: Joi.number().required(),
		status: Joi.string().required(),
        daySend: Joi.date(),
        dayRecive: Joi.date(),
        productId: Joi.string(),
	});
	return schema.validate(order);
};

const Order = mongoose.model("order", orderSchema);

module.exports = { Order, validate };