import { Schema, models, model } from 'mongoose';
import { individualSchema } from './individual';
import { businessSchema } from './business';

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
    },
    {
        timestamps: true,
    }
);
const discriminatorKey = 'account_type';

// Define the base model
const User = models?.User || model('User', userSchema);

// Define the individual and business models using discriminators
const Individual = User.discriminator('Individual', individualSchema);
const Business = User.discriminator('Business', businessSchema);

export { User, Individual, Business };
