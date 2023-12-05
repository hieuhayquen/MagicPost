const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
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
    order:{
        type: ObjectId,
        ref: 'order',
        required: true,
    },
    status:{
        type: String,
    }
});

const validate = (product) => {
	const schema = Joi.object({
		type: Joi.string().required(),
		weight: Joi.string().required(),
		desc: Joi.string().allow(''),
        order: Joi.string().required(),
        status: Joi.string().allow(''),
        
	});
	return schema.validate(product);
};

const Product = mongoose.model("product", productSchema);

module.exports = { Product, validate };