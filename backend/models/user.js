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
    orders: {
        type: [String],
        default: [],
    },
    workAt:{
        type: mongoose.Schema.Types.ObjectId,
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
        name: Joi.string().min(5).max(15).required(),
		email: Joi.string().email().required(),
		password: passwordComplexity().required(),
		phone: Joi.string().required(),
		address: Joi.string().required(),
		role: Joi.string().valid("customer", "companyAdmin", "transactionAdmin", "gatherAdmin", "transactionStaff", "gatherStaff").required(),
        orders: Joi.array().items(Joi.string()),
        workAt: Joi.string().allow(''),
    });
    return schema.validate(user);
}

const User = mongoose.model("user", userSchema);

module.exports = { User, validate };