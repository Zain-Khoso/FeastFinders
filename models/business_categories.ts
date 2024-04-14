import { Schema, model, models } from 'mongoose';

const businessCategoriesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export const BusinessCategory =
    models?.['business-category'] ||
    model('business-category', businessCategoriesSchema);
