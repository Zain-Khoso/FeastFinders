import { Schema, models, model } from 'mongoose';

const userSchema = new Schema(
    {
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        account_type: {
            type: String,
            enum: ['individual', 'business'],
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 30,
        },
        status: {
            type: String,
            enum: ['active', 'disable', 'suspended', 'deleted'],
            default: 'active',
        },
        individual: {
            type: Schema.Types.ObjectId,
            ref: 'individual',
            required: false,
        },
        business: {
            type: Schema.Types.ObjectId,
            ref: 'business',
            required: false,
        },
    },
    {
        timestamps: true,
    }
);
export const User = models.User || model('User', userSchema);
