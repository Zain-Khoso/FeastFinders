import { Schema, model, models } from 'mongoose';

export const businessSchema = new Schema({
    business_name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    business_hours: {
        type: String,
        default: '',
    },
    about_me: {
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
    ratings: {
        type: Number,
        default: 0,
    },
});
