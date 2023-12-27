const mongoose = require('mongoose');
const Joi = require('joi');
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
    senderId:{
        type: ObjectId,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    weight:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
    },
    status:{
        type: String,
    },
    place:{
        type: String,
        required: true,
    }
});

const validate = (product) => {
	const schema = Joi.object({
        senderId: Joi.string().required(),
		type: Joi.string().required(),
		weight: Joi.string().required(),
		desc: Joi.string().allow(''),
        status: Joi.string().allow(''),
        place: Joi.string().required(),
        
	});
	return schema.validate(product);
};

const Product = mongoose.model("product", productSchema);

module.exports = { Product, validate };