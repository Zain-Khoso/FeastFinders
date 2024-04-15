import { Schema, model, models } from 'mongoose';

const riderSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'individual',
            required: true,
        },
        status: {
            type: 'string',
            enum: ['active', 'inactive', 'suspended', 'blocked'],
            default: 'active',
        },
        rating: {
            type: Number,
            default: 0,
        },
        verification_status: {
            type: Boolean,
            default: false,
        },
        lifetime_earning: {
            type: Number,
            default: 0,
        },
        available_withdrawal: {
            type: Number,
            default: 0,
        },
        response_rate: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Rider = models.rider || model('rider', riderSchema);
