import { Schema, model, models } from 'mongoose';

export const individualSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    dob: {
        type: String,
        default: '',
    },
    profilePicture: {
        type: String,
        default: '',
    },
    coverPicture: {
        type: String,
        default: '',
    },
    about_me: {
        type: String,
        default: '',
        max: 180,
    },
});
