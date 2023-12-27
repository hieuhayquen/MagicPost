const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        default: 'customer',
    },
    phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    products: {
        type: Array,
        default: [],
    },
    workAt:{
        type: String,
    },
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        //payload
        { _id: this._id, name: this.name, role: this.role},
        process.env.JWTPRIVATEKEY,
        { expiresIn: "7d"}
    );
    return token;
};

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: passwordComplexity().required(),
		phone: Joi.string().required(),
		address: Joi.string().required(),
		role: Joi.string().valid("customer", "companyAdmin", "transactionAdmin", "gatherAdmin", "transactionStaff", "gatherStaff").required(),
        products: Joi.array(),
        workAt: Joi.string().allow(""),
    });
    return schema.validate(user);
}

const User = mongoose.model("user", userSchema);

module.exports = { User, validate };