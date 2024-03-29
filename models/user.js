import mongoose, { model } from "mongoose";

const { Schema } = mongoose

const userSchema = new Schema(
    {
        idCardNumber: {
            type: Number,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: false,
        },
        image:{
            type: String,
            required: false,
        },
        uid:{
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['patient', 'doctor'],
            default: 'patient',
        },
    },
    {
        timestamps: true
    }

)

export default model('User', userSchema)