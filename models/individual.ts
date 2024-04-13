import { Schema, model, models } from 'mongoose';

export const individualSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
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
        enum: ['male', 'female'],
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
export const Individual =
    models.individual || model('individual', individualSchema);
